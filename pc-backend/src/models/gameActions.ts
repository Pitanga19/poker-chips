import { Player, Pot } from './chipHolders'
import { StagesList, BetRound } from './gameFlow';

export enum ValidateList {
    GiveActions = 'giveActions',
    NextTurn = 'nextTurn',
    FinishRound = 'finishRound'
}

export enum ActionsList {
    PutSmallBlind = 'putSmallBlind',
    PutBigBlind = 'putBigBlind',
    CheckSmallBlind = 'checkSmallBlind',
    CheckBigBlind = 'checkBigBlind',
    Check = 'check',
    Bet = 'bet',
    Call = 'call',
    Raise = 'raise',
    AllIn = 'allIn',
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

    getData() {

    }

    updateNextTurn() {

    }

    updateNextStage() {

    }

    updateNextHand() {

    }
}

export class TurnValidator {
    validate(pl: Player[], pm: PositionManager, br: BetRound): ValidateList {
        const player: Player = pl[pm.turnIndex];
        const isAlone = pl.filter(p => p.isPlaying).length === 1;
        const isRaiser = pm.turnIndex === pm.raiserIndex;
        const doBigBlindCheck = br.doBigBlindCheck;
        const doAllCheck = pm.turnIndex === pm.smallBlindIndex && br.doSmallBlindCheck;
        const isPlaying = player.isPlaying;
        const mustEqualBet = player.pendingChips < br.actualBetValue;
        const isBigBlindWithoutActionInPreFlop = (
            pm.turnIndex === pm.bigBlindIndex &&
            player.pendingChips === br.bigBlindValue &&
            br.stage === StagesList.PreFlop
        );

        if (isAlone || isRaiser || doBigBlindCheck || doAllCheck) {
            return ValidateList.FinishRound;
        } else if (isPlaying && (mustEqualBet || isBigBlindWithoutActionInPreFlop)) {
            return ValidateList.GiveActions;
        } else {
            return ValidateList.NextTurn;
        }
    }
}

export class ActionSelector {
    getOptions(pl: Player[], br: BetRound, pm: PositionManager): ActionsList[] {
        const player: Player = pl[pm.turnIndex];
        const isPreFlop = br.stage === StagesList.PreFlop;
        const isSmallBlind = pm.turnIndex == pm.smallBlindIndex;
        const isBigBlind = pm.turnIndex == pm.bigBlindIndex;
        const mustPutBlind = player.pendingChips === 0;
        const isBigBlindWithoutActionInPreFlop = (
            pm.turnIndex === pm.bigBlindIndex &&
            player.pendingChips === br.bigBlindValue &&
            br.stage === StagesList.PreFlop
        );
        const mustEqualBet = player.pendingChips < br.actualBetValue;
        const mustAllIn = player.chips + player.pendingChips < br.actualBetValue;

        if (isPreFlop && isSmallBlind && mustPutBlind) {
            return [ActionsList.PutSmallBlind];
        } else if (isPreFlop && isBigBlind && mustPutBlind) {
            return [ActionsList.PutBigBlind];
        } else if (isSmallBlind) {
            return [ActionsList.CheckSmallBlind, ActionsList.Bet];
        } else if (isPreFlop && isBigBlindWithoutActionInPreFlop) {
            return [ActionsList.CheckBigBlind, ActionsList.Raise];
        } else if (mustEqualBet) {
            return [ActionsList.Call, ActionsList.Raise, ActionsList.Fold];
        } else if (mustAllIn) {
            return [ActionsList.AllIn, ActionsList.Fold];
        } else {
            return [ActionsList.Check, ActionsList.Bet];
        }
    }
}

export class PlayerActions {
    putSmallBlind(p:Player, br:BetRound){
        p.prepareChips(br.smallBlindValue);
    }
    
    putBigBlind(p:Player, br:BetRound){
        br.minimumRaise = br.bigBlindValue;
        br.actualBetValue = br.bigBlindValue;
        p.prepareChips(br.bigBlindValue);
    }
    
    check(p:Player, br:BetRound){
    }
    
    bet(p:Player, br:BetRound, amount: number){
        if (amount >= br.bigBlindValue){
            br.minimumRaise = amount;
            br.actualBetValue = amount;
            p.prepareChips(amount);
        } else {
            console.error('Invalid amount.')
        }
    }
    
    call(p:Player, br:BetRound){
        p.prepareChips(br.actualBetValue);
    }
    
    raise(p:Player, br:BetRound, amount: number){
        if (amount >= br.actualBetValue + br.minimumRaise){
            br.minimumRaise = amount - br.actualBetValue;
            br.actualBetValue = amount;
            p.prepareChips(p.pendingChips - amount);
        } else {
            console.error('Invalid amount.')
        }
    }
    
    fold(p:Player, br:BetRound){
        p.prepareChips(br.bigBlindValue);
    }
}