import express, {Request, Response} from 'express';
import cors from 'cors';
import { Game } from './models/gameStages';
import { Player } from './models/chipHolders';
import { ActionType } from './utils/constants';
import { PlayerActions } from './models/playerActions';

const app = express();
const PORT = 3000;
const IP = 'localhost';

app.use(cors());
app.use(express.json());

let currentGame: Game | null = null;

app.post('/api/newGame', (req: Request, res: Response) => {
    currentGame = new Game();
    const {bigBlindValue} = req.body
    currentGame.handStage.defineBlindsValues(bigBlindValue);

    console.log('New game created:', currentGame);
    console.log('Big blind value received:', bigBlindValue);
    
    res.status(201).json({ message: 'New game created successfully', game: currentGame.toJSON() });
});

app.post('/api/playerList', (req: Request, res: Response) => {
    const playerReq = req.body;
    const playerList: Player[] = [];

    for (let p of playerReq) {
        const newPlayer = new Player(p.id, p.chips);
        playerList.push(newPlayer);
    };

    if (!Array.isArray(playerList) || playerList.length === 0) {
        res.status(400).json({ message: 'Invalid player list' });
        return;
    };

    if (currentGame instanceof Game) {
        currentGame.playerManager.playerList = playerList;
        console.log('Received player list:', playerList);
        currentGame.positionManager.initializePositions(playerList, -1);
        console.log('Updated positions:', currentGame.positionManager);
    };
    res.status(200).json({ message: 'Player list received successfully' });
});

app.get('/api/currentGame', (req: Request, res: Response) => {
    if (currentGame) {
        res.status(200).json(currentGame);
    } else {
        res.status(404).json({ message: 'No active game found.' });
    }
})

app.get('/api/currentAvalibleActions', (req: Request, res: Response) => {
    if (currentGame) {
        const avalibleActions = currentGame.actionSelector.getOptions(currentGame);
        console.log('Updated avalible actions:', avalibleActions)
        res.status(200).json(avalibleActions);
    } else {
        res.status(404).json({ message: 'No active game found.' });
    }
})

app.post('/api/playerAction', (req: Request, res: Response) => {
    if (!currentGame) {
        res.status(404).json({ message: 'No active game found.' });
    } else {
        console.log('Received body:', req.body);
        const { action, amount } = req.body;
        console.log('Received action:', action);
        console.log('Received amount:',amount);
        const playerActions = currentGame.playerActions;
        const playerList = currentGame.playerManager.playerList;
        const positionManager = currentGame.positionManager;
        const handStage = currentGame.handStage;
        const bettingStage = currentGame.bettingStage;

        switch (action) {
            case ActionType.Bet:
                playerActions.bet(currentGame, amount);
                console.log('Update player data:', playerList[positionManager.turnIndex]);
                break;
            case ActionType.Call:
                playerActions.call(currentGame);
                console.log('Update player data:', playerList[positionManager.turnIndex]);
                break;
            case ActionType.Check:
                playerActions.check(currentGame);
                console.log('Update player data:', playerList[positionManager.turnIndex]);
                break;
            case ActionType.CheckBigBlind:
                playerActions.checkBigBlind(currentGame);
                console.log('Update player data:', playerList[positionManager.turnIndex]);
                break;
            case ActionType.CheckSmallBlind:
                playerActions.checkSmallBlind(currentGame);
                console.log('Update player data:', playerList[positionManager.turnIndex]);
                break;
            case ActionType.Fold:
                playerActions.fold(currentGame);
                console.log('Update player data:', playerList[positionManager.turnIndex]);
                break;
            case ActionType.MustAllIn:
                playerActions.mustAllIn(currentGame);
                console.log('Update player data:', playerList[positionManager.turnIndex]);
                break;
            case ActionType.PutBigBlind:
                playerActions.putBigBlind(currentGame);
                console.log('Update player data:', playerList[positionManager.turnIndex]);
                break;
            case ActionType.PutSmallBlind:
                playerActions.putSmallBlind(currentGame);
                console.log('Update player data:', playerList[positionManager.turnIndex]);
                break;
            case ActionType.Raise:
                playerActions.raise(currentGame, amount);
                console.log('Update player data:', playerList[positionManager.turnIndex]);
                break;
            default:
                res.status(400).json({ message: 'Invalid action specified.' });
                return;
        };

        res.status(200).json({ updatedGame: currentGame });
    };
});

app.listen(PORT, IP, () => {
    console.log(`Server running at http://${IP}:${PORT}`)
});