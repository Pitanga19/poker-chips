import express, {Request, Response} from 'express';
import cors from 'cors';
import { Game } from './models/gameStages';
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
    console.log('New game created:', currentGame);
    res.status(201).json({ message: 'New game created successfully', game: currentGame.toJSON() });
});

app.post('/api/playerList', (req: Request, res: Response) => {
    const playerList = req.body;

    if (!Array.isArray(playerList) || playerList.length === 0) {
        res.status(400).json({ message: 'Invalid player list' });
        return;
    }

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
        const avalibleActions = currentGame.actionSelector.getOptions(currentGame.playerManager.playerList, currentGame.positionManager, currentGame.bettingStage, currentGame.handStage);
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
        const { action, amount } = req.body;
        const playerActions = currentGame.playerActions;
        const playerList = currentGame.playerManager.playerList;
        const positionManager = currentGame.positionManager;
        const handStage = currentGame.handStage;
        const bettingStage = currentGame.bettingStage;

        switch (action) {
            case ActionType.Bet:
                playerActions.bet(playerList, positionManager, bettingStage, handStage, amount)
                break;
            case ActionType.Call:
                playerActions.call(playerList, positionManager, bettingStage)
                break;
            case ActionType.Check:
                playerActions.check(playerList, positionManager)
                break;
            case ActionType.CheckBigBlind:
                playerActions.checkBigBlind(playerList, positionManager, bettingStage)
                break;
            case ActionType.CheckSmallBlind:
                playerActions.checkSmallBlind(playerList, positionManager, bettingStage)
                break;
            case ActionType.Fold:
                playerActions.fold(playerList, positionManager)
                break;
            case ActionType.MustAllIn:
                playerActions.mustAllIn(playerList, positionManager)
                break;
            case ActionType.PutBigBlind:
                playerActions.putBigBlind(playerList, positionManager, handStage)
                break;
            case ActionType.PutSmallBlind:
                playerActions.putSmallBlind(playerList, positionManager, handStage)
                break;
            case ActionType.Raise:
                playerActions.raise(playerList, positionManager, bettingStage, amount)
                break;
            default:
                res.status(400).json({ message: 'Invalid action specified.' });
        };

        res.status(200).json({ updatedGame: currentGame });
    };
});

app.listen(PORT, IP, () => {
    console.log(`Server running at http://${IP}:${PORT}`)
});