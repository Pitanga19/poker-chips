import { Request, Response } from 'express';
import { Game } from '../models/gameStages';
import { Player } from '../models/chipHolders';
import { ActionType, BettingStageType, HandStageValidationType, BettingStageValidationType, TurnValidationType } from "../utils/constants";

let currentGame: Game | null = null;

export const newGame = (req: Request, res: Response) => {
    currentGame = new Game();
    const { bigBlindValue } = req.body;
    currentGame.handStage.defineBlindsValues(bigBlindValue);
    res.status(201).json({ message: 'New game created successfully', game: currentGame.toJSON() });
};

export const playerList = (req: Request, res: Response) => {
    const playerReq = req.body;
    const playerList: Player[] = [];

    if (!Array.isArray(playerList) || playerList.length <= 1) {
        res.status(400).json({ message: 'Invalid player list' });
        return;
    };

    for (let player of playerReq) {
        const newPlayer = new Player(player.id, player.chips);
        playerList.push(newPlayer);
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
        console.log('Validating hand ...');
        const handValidation: HandStageValidationType = currentGame.handStageValidator.validate(currentGame);
        if (handValidation === HandStageValidationType.EndGame) {
            currentGame.handStageValidator.endGame(currentGame);
        } else if (handValidation === HandStageValidationType.StartHandStage) {
            currentGame.handStageValidator.startHandStage(currentGame);
        }

        console.log('Validating betting stage');
        const bettingStageValidation: BettingStageValidationType = currentGame.bettingStageValidator.validate(currentGame);
        if (bettingStageValidation === BettingStageValidationType.EndHandStage) {
            currentGame.bettingStageValidator.endHand(currentGame);
        } else if (bettingStageValidation === BettingStageValidationType.StartBettingStage) {
            currentGame.bettingStageValidator.startBettingStage(currentGame);
        }

        console.log('Validating turn');
        const turnValidation: TurnValidationType = currentGame.turnValidator.validate(currentGame);
        if (turnValidation === TurnValidationType.EndBettingStage) {
            currentGame.turnValidator.endBettingStage(currentGame);
        } else if (turnValidation === TurnValidationType.GiveActions) {
            currentGame.turnValidator.giveActions(currentGame);
        } else if (turnValidation === TurnValidationType.NextPlayer) {
            currentGame.turnValidator.nextPlayer(currentGame);
        }

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

