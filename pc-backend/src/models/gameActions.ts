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

export class ActionSelector {
    getOptions(p: Player, br: BetRound): ActionsList[] {
        const options: ActionsList[] = [];

        if (br.actualBetValue < br.bigBlindValue) {
            br.stage == StagesList.PreFlop ? this.handleBlinds(p, options) : options.push(ActionsList.Check, ActionsList.Bet, ActionsList.Fold);
        } else if (br.actualBetValue === br.bigBlindValue && p.isBigBlind) {
            options.push(ActionsList.Check, ActionsList.Raise, ActionsList.Fold);
        } else {
            options.push(ActionsList.Call, ActionsList.Raise, ActionsList.Fold);
        }

        return options;
    }

    handleBlinds(p:Player, options: ActionsList[]): void {
        if (p.isSmallBlind) {
            options.push(ActionsList.PutSmallBlind);
        } else if (p.isBigBlind){
            options.push(ActionsList.PutBigBlind);
        } else {
            console.error('Blinds error.')
        }
    }
}

export class PlayerActions {
    putSmallBlind(p:Player, br:BetRound){
        p.prepareChips(br.smallBlindValue);
        p.endTurn();
    }
    
    putBigBlind(p:Player, br:BetRound){
        br.minimumRaise = br.bigBlindValue;
        br.actualBetValue = br.bigBlindValue;
        p.prepareChips(br.bigBlindValue);
        p.endTurn();
    }
    
    check(p:Player, br:BetRound){
        p.endTurn();
    }
    
    bet(p:Player, br:BetRound, amount: number){
        if (amount >= br.bigBlindValue){
            br.minimumRaise = amount;
            br.actualBetValue = amount;
            p.prepareChips(amount);
            p.endTurn();
        } else {
            console.error('Invalid amount.')
        }
    }
    
    call(p:Player, br:BetRound){
        p.prepareChips(br.actualBetValue);
        p.endTurn();
    }
    
    raise(p:Player, br:BetRound, amount: number){
        if (amount >= br.actualBetValue + br.minimumRaise){
            br.minimumRaise = amount - br.actualBetValue;
            br.actualBetValue = amount;
            p.prepareChips(p.pendingChips - amount);
            p.endTurn();
        } else {
            console.error('Invalid amount.')
        }
    }
    
    fold(p:Player, br:BetRound){
        p.prepareChips(br.bigBlindValue);
        p.endTurn();
    }
}

export class PositionManager {
    private _dealerIndex: number;
    private _smallBlindIndex: number;
    private _bigBlindIndex: number;
    private _turnIndex: number;
    private _raiserIndex: number;
    private _winnerIndex: number;

    constructor () {
        this._dealerIndex = -1;
        this._smallBlindIndex = -1;
        this._bigBlindIndex = -1;
        this._turnIndex = -1;
        this._raiserIndex = -1;
        this._winnerIndex = -1;
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

    set dealerIndex(value: number) {
        this._dealerIndex = value;
    }

    get smallBlindIndex(): number {
        return this._smallBlindIndex;
    }

    set smallBlindIndex(value: number) {
        this._smallBlindIndex = value;
    }

    get bigBlindIndex(): number {
        return this._bigBlindIndex;
    }

    set bigBlindIndex(value: number) {
        this._bigBlindIndex = value;
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

    get winnerIndex(): number {
        return this._winnerIndex;
    }

    set winnerIndex(index: number) {
        this._winnerIndex = index;
    }

    updateNextHand() {

    }
}