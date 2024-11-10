import { loopArrayManager } from '../utils/arrayManager';
import { Player, Pot } from './chipHolders'
import { BettingStageType, BettingStage, HandStage } from './gameFlow';

export enum ValidationType {
    GiveActions = 'giveActions',
    NextTurn = 'nextTurn',
    FinishRound = 'finishRound'
}

export enum ActionType {
    PutSmallBlind = 'putSmallBlind',
    PutBigBlind = 'putBigBlind',
    CheckSmallBlind = 'checkSmallBlind',
    CheckBigBlind = 'checkBigBlind',
    Check = 'check',
    Bet = 'bet',
    Call = 'call',
    Raise = 'raise',
    MustAllIn = 'allIn',
    Fold = 'fold'
}

export class PositionManager {
    private _dealerIndex: number;
    private _smallBlindIndex: number;
    private _bigBlindIndex: number;
    private _turnIndex: number;
    private _raiserIndex: number;
    private _winnersIndex: number[];

    constructor () {
        this._dealerIndex = -1;
        this._smallBlindIndex = -1;
        this._bigBlindIndex = -1;
        this._turnIndex = -1;
        this._raiserIndex = -1;
        this._winnersIndex = [];
    }

    toJSON() {
        return {
            dealerIndex: this._dealerIndex,
            smallBlindIndex: this._smallBlindIndex,
            bigBlindIndex: this._bigBlindIndex,
            turnIndex: this._turnIndex,
            raiserIndex: this._raiserIndex,
            winnersIndex: this._winnersIndex
        }
    }

    get dealerIndex(): number {
        return this._dealerIndex;
    }

    set dealerIndex(index: number) {
        this._dealerIndex = index;
    }

    get smallBlindIndex(): number {
        return this._smallBlindIndex;
    }

    set smallBlindIndex(index: number) {
        this._smallBlindIndex = index;
    }

    get bigBlindIndex(): number {
        return this._bigBlindIndex;
    }

    set bigBlindIndex(index: number) {
        this._bigBlindIndex = index;
    }

    get turnIndex(): number {
        return this._turnIndex;
    }

    set turnIndex(index: number) {
        this._turnIndex = index;
    }

    get raiserIndex(): number {
        return this._raiserIndex;
    }

    set raiserIndex(index: number) {
        this._raiserIndex = index;
    }

    get winnersIndex(): number[] {
        return this._winnersIndex;
    }

    set winnersIndex(indexList: number[]) {
        this._winnersIndex = indexList;
    }

    checkDealerIsPlaying(pl: Player[], dealerIndex: number): boolean {
        return pl[dealerIndex].isPlaying && pl[dealerIndex].chips > 0;
    }

    findFirstPlayingDealerIndex(pl: Player[], dealerIndex: number) {
        let firstPlayingDealerIndex = dealerIndex;
        let checkedPlayingCount = 0;

        while (!this.checkDealerIsPlaying(pl, firstPlayingDealerIndex) && checkedPlayingCount < pl.length) {
            firstPlayingDealerIndex = loopArrayManager.getNextIndex(pl, firstPlayingDealerIndex);
            checkedPlayingCount++;
        }
        
        return firstPlayingDealerIndex;
    }

    initializePositions(pl: Player[], dealerIndex: number) {
        this._dealerIndex =  this.findFirstPlayingDealerIndex(pl, dealerIndex);
        this._smallBlindIndex = loopArrayManager.getNextIndex(pl, this._dealerIndex);
        this._bigBlindIndex = loopArrayManager.getNextIndex(pl, this._smallBlindIndex);
        this._turnIndex = this._smallBlindIndex;
        this._raiserIndex = -1;
        this._winnersIndex = [];
    }

    updateNextTurn(pl: Player[]) {
        this._turnIndex = loopArrayManager.getNextIndex(pl, this._turnIndex);
    }

    updateNextStage(pl: Player[]) {
        this._turnIndex = this._smallBlindIndex;
        this._raiserIndex = -1;
    }

    updateNextHand(pl: Player[]) {
        const nextDealer = loopArrayManager.getNextIndex(pl, this._dealerIndex);
        this.initializePositions(pl, nextDealer);
    }
}

export class TurnValidator {
    validate(pl: Player[], pm: PositionManager, bs: BettingStage, hs: HandStage): ValidationType {
        const player: Player = pl[pm.turnIndex];
        const arePlaying = pl.filter(p => p.isPlaying);
        const isAlone = arePlaying.length === 1;
        const isRaiser = pm.turnIndex === pm.raiserIndex;
        const doBigBlindCheck = bs.doBigBlindCheck;
        const doAllCheck = pm.turnIndex === pm.smallBlindIndex && bs.doSmallBlindCheck;
        const isEveryoneAllIn = arePlaying.filter(p => p.chips > 0).length == 1;
        const isPlaying = player.isPlaying;
        const mustEqualBet = player.pendingChips < bs.actualBetValue;
        const isBigBlindWithoutActionInPreFlop = (
            pm.turnIndex === pm.bigBlindIndex &&
            player.pendingChips === hs.bigBlindValue &&
            bs.stage === BettingStageType.PreFlop
        );

        if (isAlone || isRaiser || doBigBlindCheck || doAllCheck || isEveryoneAllIn) {
            return ValidationType.FinishRound;
        } else if (isPlaying && (mustEqualBet || isBigBlindWithoutActionInPreFlop)) {
            return ValidationType.GiveActions;
        } else {
            return ValidationType.NextTurn;
        }
    }
}

export class ActionSelector {
    getOptions(pl: Player[], pm: PositionManager, bs: BettingStage, hs:HandStage): ActionType[] {
        const player: Player = pl[pm.turnIndex];
        const isPreFlop = bs.stage === BettingStageType.PreFlop;
        const isSmallBlind = pm.turnIndex == pm.smallBlindIndex;
        const isBigBlind = pm.turnIndex == pm.bigBlindIndex;
        const mustPutBlind = player.pendingChips === 0;
        const isBigBlindWithoutActionInPreFlop = (
            pm.turnIndex === pm.bigBlindIndex &&
            player.pendingChips === hs.bigBlindValue &&
            bs.stage === BettingStageType.PreFlop
        );
        const mustEqualBet = player.pendingChips < bs.actualBetValue;
        const mustAllIn = player.chips + player.pendingChips < bs.actualBetValue;

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
        const player: Player = pl[pm.turnIndex];
        player.prepareChips(hs.smallBlindValue);
        pm.updateNextTurn(pl);
    }
    
    putBigBlind(pl: Player[], pm: PositionManager, bs: BettingStage, hs: HandStage){
        const player: Player = pl[pm.turnIndex];

        player.prepareChips(hs.bigBlindValue);
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
        const player: Player = pl[pm.turnIndex];
        const isValidAmount: boolean = amount > hs.bigBlindValue;

        if (isValidAmount) {
            player.prepareChips(amount);
            pm.raiserIndex = pm.turnIndex;
            bs.actualBetValue = amount;
            bs.minimumRaise = amount * 2;
            pm.updateNextTurn(pl);
        } else {
            console.log('Invalid amount, bet must be equal or bigger than big blind.');
        };
    }
    
    call(pl: Player[], pm: PositionManager, bs: BettingStage){
        const player: Player = pl[pm.turnIndex];
        
        player.prepareChips(bs.actualBetValue);
        pm.updateNextTurn(pl);
    }
    
    raise(pl: Player[], pm: PositionManager, bs: BettingStage, amount: number){
        const player: Player = pl[pm.turnIndex];
        const isValidAmount: boolean = amount >= bs.minimumRaise;

        if (isValidAmount) {
            const raiseValue: number = amount - bs.actualBetValue;
            player.prepareChips(amount - player.pendingChips);
            pm.raiserIndex = pm.turnIndex;
            bs.actualBetValue = amount;
            bs.minimumRaise = bs.actualBetValue + raiseValue;
            pm.updateNextTurn(pl);
        } else {
            console.log('Invalid amount, raise must be equal or bigger than last one.');
        };
    }
    
    mustAllIn(pl: Player[], pm: PositionManager){
        const player: Player = pl[pm.turnIndex];
        
        player.prepareChips(player.chips);
        pm.updateNextTurn(pl);
    }
    
    fold(pl: Player[], pm: PositionManager){
        const player: Player = pl[pm.turnIndex];
        
        player.stopPlaying();
        pm.updateNextTurn(pl);
    }
}