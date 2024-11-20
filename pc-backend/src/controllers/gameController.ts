import { Request, Response } from 'express';
import { Game } from '../models/gameStages';
import { Player, PotManager } from '../models/chipHolders';
import { ActionType, toExecuteValidatorType, HandStageValidationType, BettingStageValidationType, TurnValidationType } from "../utils/constants";

export let game: Game | null = null;
export let toExecuteValidator: toExecuteValidatorType = toExecuteValidatorType.HandStageValidator;

export const newGame = (req: Request, res: Response) => {
    game = new Game();
    const bigBlindValue = parseInt(req.body.bigBlindValue);
    game.handStage.defineBlindsValues(bigBlindValue);
    res.status(201).json({ message: 'New game created successfully', game: game.toJSON() });
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

    if (game instanceof Game) {
        game.playerManager.playerList = playerList;
        game.positionManager.initializePositions(game, -1);
        console.log('Updated positions:', game.positionManager);
    };

    res.status(200).json({ message: 'Player list received successfully', playerList: game?.playerManager.playerList });
};

export const currentGame = (req: Request, res: Response) => {
    if (!game) {
        res.status(404).json({ message: 'No active game found.' });
    } else {
        console.log('Sending updated game ...');
        const updatedGame = game.toJSON();
        res.status(200).json(updatedGame);
    };
};

export const currentToExecuteValidator = (req: Request, res: Response) => {
    try {
        if (!game) {
            res.status(404).json({ message: 'No active game found.' });
        } else {
            console.log('Current validator:', toExecuteValidator);

            switch (toExecuteValidator) {
                case toExecuteValidatorType.GameOver:
                    console.log('Game over');
                    break
                    
                case toExecuteValidatorType.HandStageValidator:
                    const handStageValidation: HandStageValidationType = game.handStageValidator.validate(game);
                    if (handStageValidation === HandStageValidationType.EndGame) {
                        toExecuteValidator = game.handStageValidator.endGame(game);
                    } else if (handStageValidation === HandStageValidationType.StartHandStage) {
                        toExecuteValidator = game.handStageValidator.startHandStage(game);
                    }
                    break

                case toExecuteValidatorType.BettingStageValidator:
                    const bettingStageValidation: BettingStageValidationType = game.bettingStageValidator.validate(game);if (bettingStageValidation === BettingStageValidationType.EndHandStage) {
                        toExecuteValidator = game.bettingStageValidator.endHand(game);
                    } else if (bettingStageValidation === BettingStageValidationType.StartBettingStage) {
                        toExecuteValidator = game.bettingStageValidator.startBettingStage(game);
                    }
                    break

                case toExecuteValidatorType.TurnValidator:
                    const turnValidation: TurnValidationType = game.turnValidator.validate(game);
                    if (turnValidation === TurnValidationType.EndBettingStage) {
                        toExecuteValidator = game.turnValidator.endBettingStage(game);
                    } else if (turnValidation === TurnValidationType.NextPlayer) {
                        toExecuteValidator = game.turnValidator.nextPlayer(game);
                    } else if (turnValidation === TurnValidationType.GiveActions) {
                        toExecuteValidator = game.turnValidator.giveActions(game);
                    }
                    break

                default:
                    throw new Error('Unexpected validator type.');
            };

            console.log('Sending to execute validator:', toExecuteValidator)
            res.status(200).json(toExecuteValidator);
        };
    } catch (error) {
        console.error('Error processing toExecuteValidation:', error);
        if (error instanceof Error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error', error: 'Unknowd error.' });
        };
    };
};

export const avalibleActions = (req: Request, res: Response) => {
    try {
        if (!game) {
            res.status(404).json({ message: 'No active game found.' });
        } else {
            const avalibleActions = game.actionSelector.getOptions(game);
            console.log('Sending avalible actions:', avalibleActions)
            res.status(200).json(avalibleActions);
        }
    } catch (error) {
        console.error('Error processing avalibleActionsValidation:', error);
        if (error instanceof Error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error', error: 'Unknowd error.' });
        };
    };
};

export const playerAction = (req: Request, res: Response) => {
    if (!game) {
        res.status(404).json({ message: 'No active game found.' });
    } else {
        console.log('Received data:', req.body);
        const { action, amount } = req.body;
        const playerActions = game.playerActions;

        switch (action) {
            case ActionType.Bet:
                playerActions.bet(game, amount);
                break;
            case ActionType.Call:
                playerActions.call(game);
                break;
            case ActionType.Check:
                playerActions.check(game);
                break;
            case ActionType.CheckBigBlind:
                playerActions.checkBigBlind(game);
                break;
            case ActionType.Fold:
                playerActions.fold(game);
                break;
            case ActionType.MustAllIn:
                playerActions.mustAllIn(game);
                break;
            case ActionType.PutBigBlind:
                playerActions.putBigBlind(game);
                break;
            case ActionType.PutSmallBlind:
                playerActions.putSmallBlind(game);
                break;
            case ActionType.Raise:
                playerActions.raise(game, amount);
                break;
            case ActionType.RaiseAllIn:
                playerActions.raiseAllIn(game);
                break;
            default:
                res.status(400).json({ message: 'Invalid action specified.' });
                return;
        };

        toExecuteValidator = toExecuteValidatorType.TurnValidator;
        res.status(200).json({ updatedGame: game });
    };
};

export const winnerSelect = (req: Request, res: Response) => {
    const winnerListPerPot = req.body.winnerListPerPot;
    /*
    if (!winnerListPerPot || !Array.isArray(winnerListPerPot)) {
        return res.status(400).json({ message: 'Invalid data format for winnerListPerPot.' });
    }
    */
    if (!game) {
        res.status(404).json({ message: 'No active game found.' });
    } else {
        const potManager = game.potManager;
        const potList = game.potManager.potList;
        const playerManager = game.playerManager;
        const positionManager = game.positionManager;

        for (let i in potList) {
            potList[i].activePlayerIds = winnerListPerPot[i];
            potList[i].defineWinners(game);
            potList[i].payWinners(game);
        };

        potManager.resetPotList();
        playerManager.resetIsPlaying();
        positionManager.updateNextHand(game);
        toExecuteValidator = toExecuteValidatorType.HandStageValidator;
    };

    res.status(200).json({ updatedGame: game });
};