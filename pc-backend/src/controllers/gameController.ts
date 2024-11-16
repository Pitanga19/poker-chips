import { Request, Response } from 'express';
import { Game } from '../models/gameStages';
import { Player } from '../models/chipHolders';
import { ActionType, HandStageValidationType, BettingStageValidationType, TurnValidationType } from "../utils/constants";
import { executeValidators } from '../utils/validators';

export let currentGame: Game | null = null;

export const newGame = (req: Request, res: Response) => {
    currentGame = new Game();
    const bigBlindValue = parseInt(req.body.bigBlindValue);
    currentGame.handStage.defineBlindsValues(bigBlindValue);
    res.status(201).json({ message: 'New game created successfully', game: currentGame.toJSON() });
};

export const playerList = (req: Request, res: Response) => {
    const playerReq = req.body;
    const playerList: Player[] = [];

    for (let player of playerReq) {
        const newPlayer = new Player(player.id, player.chips);
        playerList.push(newPlayer);
    };

    if (!Array.isArray(playerReq) || playerReq.length <= 1) {
        res.status(400).json({ message: 'Invalid player list' });
        return;
    };

    if (currentGame instanceof Game) {
        currentGame.playerManager.playerList = playerList;
        currentGame.positionManager.initializePositions(playerList, -1);
        console.log('Updated positions:', currentGame.positionManager);
    };

    res.status(200).json({ message: 'Player list received successfully', playerList: currentGame?.playerManager.playerList });
};

export const game = (req: Request, res: Response) => {
    if (currentGame) {
        executeValidators(currentGame);
        res.status(200).json(currentGame);
    } else {
        res.status(404).json({ message: 'No active game found.' });
    };
};

export const currentAvalibleActions = (req: Request, res: Response) => {
    if (currentGame) {
        const avalibleActions = currentGame.actionSelector.getOptions(currentGame);
        console.log('Updated avalible actions:', avalibleActions)
        res.status(200).json(avalibleActions);
    } else {
        res.status(404).json({ message: 'No active game found.' });
    };
};

export const playerAction = (req: Request, res: Response) => {
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
};

