import { Player } from './chipHolders'
import { HandStage, BettingStage, PositionManager } from './gameFlow';
import { ActionType, BettingStageType } from '../utils/constants';

export class ActionSelector {
    getOptions(pl: Player[], pm: PositionManager, bs: BettingStage, hs:HandStage): ActionType[] {
        const currentPlayer: Player = pl[pm.turnIndex];
        const isPreFlop = bs.stage === BettingStageType.PreFlop;
        const isSmallBlind = pm.turnIndex == pm.smallBlindIndex;
        const isBigBlind = pm.turnIndex == pm.bigBlindIndex;
        const mustPutBlind = currentPlayer.pendingChips === 0;
        const isBigBlindWithoutActionInPreFlop = (
            pm.turnIndex === pm.bigBlindIndex &&
            currentPlayer.pendingChips === hs.bigBlindValue &&
            bs.stage === BettingStageType.PreFlop
        );
        const mustEqualBet = currentPlayer.pendingChips < bs.actualBetValue;
        const mustAllIn = currentPlayer.chips + currentPlayer.pendingChips < bs.actualBetValue;

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
    putSmallBlind(pl: Player[], pm: PositionManager, bs: BettingStage, hs: HandStage){
        const currentPlayer: Player = pl[pm.turnIndex];
        currentPlayer.prepareChips(hs.smallBlindValue);
        pm.updateNextTurn(pl);
    }
    
    putBigBlind(pl: Player[], pm: PositionManager, bs: BettingStage, hs: HandStage){
        const currentPlayer: Player = pl[pm.turnIndex];

        currentPlayer.prepareChips(hs.bigBlindValue);
        pm.updateNextTurn(pl);
    }
    
    checkSmallBlind(pl: Player[], pm: PositionManager, bs: BettingStage){
        bs.setSmallBlindCheck();
        pm.updateNextTurn(pl);
    }
    
    checkBigBlind(pl: Player[], pm: PositionManager, bs: BettingStage){
        bs.setBigBlindCheck();
        pm.updateNextTurn(pl);
    }
    
    check(pl: Player[], pm: PositionManager){
        pm.updateNextTurn(pl);
    }
    
    bet(pl: Player[], pm: PositionManager, bs: BettingStage, hs: HandStage, amount: number){
        const currentPlayer: Player = pl[pm.turnIndex];
        const isValidAmount: boolean = amount > hs.bigBlindValue;

        if (isValidAmount) {
            currentPlayer.prepareChips(amount);
            pm.raiserIndex = pm.turnIndex;
            bs.actualBetValue = amount;
            bs.minimumRaise = amount * 2;
            pm.updateNextTurn(pl);
        } else {
            console.log('Invalid amount, bet must be equal or bigger than big blind.');
        };
    }
    
    call(pl: Player[], pm: PositionManager, bs: BettingStage){
        const currentPlayer: Player = pl[pm.turnIndex];
        
        currentPlayer.prepareChips(bs.actualBetValue);
        pm.updateNextTurn(pl);
    }
    
    raise(pl: Player[], pm: PositionManager, bs: BettingStage, amount: number){
        const currentPlayer: Player = pl[pm.turnIndex];
        const isValidAmount: boolean = amount >= bs.minimumRaise;

        if (isValidAmount) {
            const raiseValue: number = amount - bs.actualBetValue;
            currentPlayer.prepareChips(amount - currentPlayer.pendingChips);
            pm.raiserIndex = pm.turnIndex;
            bs.actualBetValue = amount;
            bs.minimumRaise = bs.actualBetValue + raiseValue;
            pm.updateNextTurn(pl);
        } else {
            console.log('Invalid amount, raise must be equal or bigger than last one.');
        };
    }
    
    mustAllIn(pl: Player[], pm: PositionManager){
        const currentPlayer: Player = pl[pm.turnIndex];
        
        currentPlayer.prepareChips(currentPlayer.chips);
        pm.updateNextTurn(pl);
    }
    
    fold(pl: Player[], pm: PositionManager){
        const currentPlayer: Player = pl[pm.turnIndex];
        
        currentPlayer.stopPlaying();
        pm.updateNextTurn(pl);
    }
}