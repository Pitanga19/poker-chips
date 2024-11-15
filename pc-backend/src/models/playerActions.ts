import { Player } from './chipHolders'
import { PositionManager } from './gameFlow';
import { Game } from './gameStages';
import { ActionType, BettingStageType } from '../utils/constants';

export class ActionSelector {
    getOptions(game: Game): ActionType[] {
        const playerManager = game.playerManager;
        const playerList = playerManager.playerList;
        const positionManager = game.positionManager;
        const handStage = game.handStage;
        const bettingStage = game.bettingStage;

        const currentPlayer: Player = playerList[positionManager.turnIndex];
        const isPreFlop = bettingStage.stage === BettingStageType.PreFlop;
        const isSmallBlind = positionManager.turnIndex == positionManager.smallBlindIndex;
        const isBigBlind = positionManager.turnIndex == positionManager.bigBlindIndex;
        const isBetting = currentPlayer.pendingChips > 0;
        const isBettingBigBlind = currentPlayer.pendingChips === handStage.bigBlindValue;
        const mustEqualBet = currentPlayer.pendingChips < bettingStage.actualBetValue;
        const mustAllIn = currentPlayer.chips + currentPlayer.pendingChips < bettingStage.actualBetValue;

        if (isPreFlop) {
            if (isSmallBlind && !isBetting) {
                return [ActionType.PutSmallBlind];
            } else if (isBigBlind) {
                if (!isBetting) {
                    return [ActionType.PutBigBlind];
                } else if (isBettingBigBlind && !mustEqualBet) {
                    return [ActionType.CheckBigBlind, ActionType.Raise];
                }
            }
        }
        
        if (isSmallBlind && !isBetting) {
            return [ActionType.CheckSmallBlind];
        }
        
        if (mustEqualBet) {
            return [ActionType.Call, ActionType.Raise, ActionType.Fold];
        }
        
        if (mustAllIn) {
            return [ActionType.MustAllIn, ActionType.Fold];
        }
        
        return [ActionType.Check, ActionType.Bet];
    }
}

export class PlayerActions {
    putSmallBlind(game: Game): void {
        const playerManager = game.playerManager;
        const playerList = playerManager.playerList;
        const positionManager = game.positionManager;
        const handStage = game.handStage;
        const currentPlayer: Player = playerList[positionManager.turnIndex];

        currentPlayer.prepareChips(handStage.smallBlindValue);
        positionManager.updateNextTurn(playerList);
    }
    
    putBigBlind(game: Game): void {
        const playerManager = game.playerManager;
        const playerList = playerManager.playerList;
        const positionManager = game.positionManager;
        const currentPlayer: Player = playerList[positionManager.turnIndex];
        const bettingStage = game.bettingStage;
        const handStage = game.handStage;

        bettingStage.actualBetValue = handStage.bigBlindValue;
        bettingStage.minimumRaise = handStage.bigBlindValue * 2;
        currentPlayer.prepareChips(handStage.bigBlindValue);
        positionManager.updateNextTurn(playerList);
    }
    
    checkSmallBlind(game: Game): void {
        const playerManager = game.playerManager;
        const playerList = playerManager.playerList;
        const positionManager = game.positionManager;
        const bettingStage = game.bettingStage;

        bettingStage.setSmallBlindCheck();
        positionManager.updateNextTurn(playerList);
    }
    
    checkBigBlind(game: Game): void {
        const playerManager = game.playerManager;
        const playerList = playerManager.playerList;
        const positionManager = game.positionManager;
        const bettingStage = game.bettingStage;

        bettingStage.setBigBlindCheck();
        positionManager.updateNextTurn(playerList);
    }
    
    check(game: Game): void {
        const playerManager = game.playerManager;
        const playerList = playerManager.playerList;
        const positionManager = game.positionManager;

        positionManager.updateNextTurn(playerList);
    }
    
    bet(game: Game, amount: number): void {
        const playerManager = game.playerManager;
        const playerList = playerManager.playerList;
        const positionManager = game.positionManager;
        const currentPlayer: Player = playerList[positionManager.turnIndex];
        const handStage = game.handStage;
        const bettingStage = game.bettingStage;
        const isValidAmount: boolean = amount > handStage.bigBlindValue;

        if (isValidAmount) {
            currentPlayer.prepareChips(amount);
            positionManager.raiserIndex = positionManager.turnIndex;
            bettingStage.actualBetValue = amount;
            bettingStage.minimumRaise = amount * 2;
            positionManager.updateNextTurn(playerList);
        } else {
            console.log('Invalid amount, bet must be equal or bigger than big blind.');
        };
    }
    
    call(game: Game): void {
        const playerManager = game.playerManager;
        const playerList = playerManager.playerList;
        const positionManager = game.positionManager;
        const currentPlayer: Player = playerList[positionManager.turnIndex];
        const bettingStage = game.bettingStage;
        
        currentPlayer.prepareChips(bettingStage.actualBetValue - currentPlayer.pendingChips);
        positionManager.updateNextTurn(playerList);
    }
    
    raise(game: Game, amount: number): void {
        const playerManager = game.playerManager;
        const playerList = playerManager.playerList;
        const positionManager = game.positionManager;
        const currentPlayer: Player = playerList[positionManager.turnIndex];
        const bettingStage = game.bettingStage;
        const isValidAmount: boolean = amount >= bettingStage.minimumRaise;

        if (isValidAmount) {
            const raiseValue: number = amount - bettingStage.actualBetValue;
            currentPlayer.prepareChips(amount - currentPlayer.pendingChips);
            positionManager.raiserIndex = positionManager.turnIndex;
            bettingStage.actualBetValue = amount;
            bettingStage.minimumRaise = bettingStage.actualBetValue + raiseValue;
            positionManager.updateNextTurn(playerList);
        } else {
            console.log('Invalid amount, raise must be equal or bigger than last one.');
        };
    }
    
    mustAllIn(game: Game): void {
        const playerManager = game.playerManager;
        const playerList = playerManager.playerList;
        const positionManager = game.positionManager;
        const currentPlayer: Player = playerList[positionManager.turnIndex];
        
        currentPlayer.prepareChips(currentPlayer.chips);
        positionManager.updateNextTurn(playerList);
    }
    
    fold(game: Game): void {
        const playerManager = game.playerManager;
        const playerList = playerManager.playerList;
        const positionManager = game.positionManager;
        const currentPlayer: Player = playerList[positionManager.turnIndex];
        
        currentPlayer.stopPlaying();
        positionManager.updateNextTurn(playerList);
    }
}