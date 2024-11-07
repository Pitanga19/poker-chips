import { Player, Pot } from './chipHolders'
import { StagesList, BetRound } from './gameFlow';

export enum ActionsList {
    PutSmallBlind = 'putSmallBlind',
    PutBigBlind = 'putBigBlind',
    Check = 'check',
    Bet = 'bet',
    Call = 'call',
    Raise = 'raise',
    Fold = 'fold'
}

export enum ValidateList {
    GiveActions = 'giveActions',
    NextTurn = 'nextTurn',
    FinishRound = 'finishRound'
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

export class PositionManager {
    private _dealerIndex: number;
    private _smallBlindIndex: number;
    private _bigBlindIndex: number;
    private _turnIndex: number;
    private _raiserIndex: number;
    private _winnerIndex: number[];

    constructor () {
        this._dealerIndex = -1;
        this._smallBlindIndex = -1;
        this._bigBlindIndex = -1;
        this._turnIndex = -1;
        this._raiserIndex = -1;
        this._winnerIndex = [];
    }

    toJSON() {
        return {
            dealerIndex: this._dealerIndex,
            smallBlindIndex: this._smallBlindIndex,
            bigBlindIndex: this._bigBlindIndex,
            turnIndex: this._turnIndex,
            raiserIndex: this._raiserIndex,
            winnerIndex: this._winnerIndex
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

    get winnerIndex(): number[] {
        return this._winnerIndex;
    }

    set winnerIndex(indexList: number[]) {
        this._winnerIndex = indexList;
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

export class ActionSelector {
    getOptions(p: Player, br: BetRound): ActionsList[] {
        const options: ActionsList[] = [];

        if (br.actualBetValue < br.bigBlindValue) {
            br.stage === StagesList.PreFlop ? this.handleBlinds() : options.push(ActionsList.Check, ActionsList.Bet, ActionsList.Fold);
        } else if (br.actualBetValue === br.bigBlindValue /* && p.isBigBlind */) {
            options.push(ActionsList.Check, ActionsList.Raise, ActionsList.Fold);
        } else {
            options.push(ActionsList.Call, ActionsList.Raise, ActionsList.Fold);
        }

        return options;
    }

    handleBlinds(): void {
    }
}

export class TurnValidator {
    validate(pl: Player[], pm: PositionManager, br: BetRound): ValidateList {
        const player: Player = pl[pm.turnIndex];
        const isAlone = pl.filter(p => p.isPlaying).length === 1;
        const isRaiser = pm.turnIndex === pm.raiserIndex;
        const isPlaying = player.isPlaying;
        const mustEqualBet = player.pendingChips < br.actualBetValue
        const isBigBlindWithoutActionInPreFlop = pm.turnIndex === pm.bigBlindIndex && player.pendingChips === br.bigBlindValue && br.stage === StagesList.PreFlop;

        if (isAlone || isRaiser) {
            return ValidateList.FinishRound;
        } else if (isPlaying && (mustEqualBet || isBigBlindWithoutActionInPreFlop)) {
            return ValidateList.GiveActions
        } else {
            return ValidateList.NextTurn
        }
    }
}