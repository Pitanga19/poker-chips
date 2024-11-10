import { Player } from './chipHolders'
import { HandStage, BettingStage, PositionManager } from './gameFlow';
import { ActionType, BettingStageType } from '../utils/constants';

export class ActionSelector {
    getOptions(playerList: Player[], positionManager: PositionManager, bettingStage: BettingStage, handStage:HandStage): ActionType[] {
        const currentPlayer: Player = playerList[positionManager.turnIndex];
        const isPreFlop = bettingStage.stage === BettingStageType.PreFlop;
        const isSmallBlind = positionManager.turnIndex == positionManager.smallBlindIndex;
        const isBigBlind = positionManager.turnIndex == positionManager.bigBlindIndex;
        const mustPutBlind = currentPlayer.pendingChips === 0;
        const isBigBlindWithoutActionInPreFlop = (
            positionManager.turnIndex === positionManager.bigBlindIndex &&
            currentPlayer.pendingChips === handStage.bigBlindValue &&
            bettingStage.stage === BettingStageType.PreFlop
        );
        const mustEqualBet = currentPlayer.pendingChips < bettingStage.actualBetValue;
        const mustAllIn = currentPlayer.chips + currentPlayer.pendingChips < bettingStage.actualBetValue;

        if (isPreFlop && isSmallBlind && mustPutBlind) {
            return [ActionType.PutSmallBlind];
        } else if (isPreFlop && isBigBlind && mustPutBlind) {
            return [ActionType.PutBigBlind];
        } else if (isSmallBlind) {
            return [ActionType.CheckSmallBlind, ActionType.Bet];
        } else if (isPreFlop && isBigBlindWithoutActionInPreFlop) {
            return [ActionType.CheckBigBlind, ActionType.Raise];
        } else if (mustEqualBet) {
            return [ActionType.Call, ActionType.Raise, ActionType.Fold];
        } else if (mustAllIn) {
            return [ActionType.MustAllIn, ActionType.Fold];
        } else {
            return [ActionType.Check, ActionType.Bet];
        }
    }
}

export class PlayerActions {
    putSmallBlind(playerList: Player[], positionManager: PositionManager, bettingStage: BettingStage, handStage: HandStage): void {
        const currentPlayer: Player = playerList[positionManager.turnIndex];
        currentPlayer.prepareChips(handStage.smallBlindValue);
        positionManager.updateNextTurn(playerList);
    }
    
    putBigBlind(playerList: Player[], positionManager: PositionManager, bettingStage: BettingStage, handStage: HandStage): void {
        const currentPlayer: Player = playerList[positionManager.turnIndex];

        currentPlayer.prepareChips(handStage.bigBlindValue);
        positionManager.updateNextTurn(playerList);
    }
    
    checkSmallBlind(playerList: Player[], positionManager: PositionManager, bettingStage: BettingStage): void {
        bettingStage.setSmallBlindCheck();
        positionManager.updateNextTurn(playerList);
    }
    
    checkBigBlind(playerList: Player[], positionManager: PositionManager, bettingStage: BettingStage): void {
        bettingStage.setBigBlindCheck();
        positionManager.updateNextTurn(playerList);
    }
    
    check(playerList: Player[], positionManager: PositionManager): void {
        positionManager.updateNextTurn(playerList);
    }
    
    bet(playerList: Player[], positionManager: PositionManager, bettingStage: BettingStage, handStage: HandStage, amount: number): void {
        const currentPlayer: Player = playerList[positionManager.turnIndex];
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
    
    call(playerList: Player[], positionManager: PositionManager, bettingStage: BettingStage): void {
        const currentPlayer: Player = playerList[positionManager.turnIndex];
        
        currentPlayer.prepareChips(bettingStage.actualBetValue);
        positionManager.updateNextTurn(playerList);
    }
    
    raise(playerList: Player[], positionManager: PositionManager, bettingStage: BettingStage, amount: number): void {
        const currentPlayer: Player = playerList[positionManager.turnIndex];
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
    
    mustAllIn(playerList: Player[], positionManager: PositionManager): void {
        const currentPlayer: Player = playerList[positionManager.turnIndex];
        
        currentPlayer.prepareChips(currentPlayer.chips);
        positionManager.updateNextTurn(playerList);
    }
    
    fold(playerList: Player[], positionManager: PositionManager): void {
        const currentPlayer: Player = playerList[positionManager.turnIndex];
        
        currentPlayer.stopPlaying();
        positionManager.updateNextTurn(playerList);
    }
}