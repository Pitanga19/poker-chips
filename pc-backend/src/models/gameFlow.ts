import * as chips from './chipHolders'
import { loopArrayManager, noLoopArrayManager} from '../utils/arrayManager';

export class BetRound {
    private _isPreFlop: boolean;
    private _smallBlind: number;
    private _bigBlind: number;
    private _initialBet: number;
    private _actualBet: number;
    private _actualTurnIndex: number;
    private _actualRaiserIndex: number | null;

    constructor(isPreFlop: boolean, smallBlind: number, bigBlind: number, actualTurnIndex: number) {
        this._isPreFlop = isPreFlop;
        this._smallBlind = smallBlind;
        this._bigBlind = bigBlind;
        this._initialBet = 0;
        this._actualBet = 0;
        this._actualTurnIndex = actualTurnIndex;
        this._actualRaiserIndex = null;
    }

    toJSON() {
        return {
            isPreFlop: this._isPreFlop,
            smallBlind: this._smallBlind,
            bigBlind: this._bigBlind,
            initialBet: this._initialBet,
            actualBet: this._actualBet,
            actualTurnIndex: this._actualTurnIndex,
            actualRaiser: this._actualRaiserIndex
        }
    }

    get isPreFlop(): boolean {
        return this._isPreFlop;
    }

    setPreFlop(): void {
        this._isPreFlop = true;
    }

    clearPreFlop(): void {
        this._isPreFlop = false;
    }

    get smallBlind(): number {
        return this._smallBlind;
    }

    set smallBlind(value: number) {
        this._smallBlind = value;
    }

    get bigBlind(): number {
        return this._bigBlind;
    }

    set bigBlind(value: number) {
        this._bigBlind = value;
    }

    get initialBet(): number {
        return this._initialBet;
    }

    set initialBet(value: number) {
        this._initialBet = value;
    }

    get actualBet(): number {
        return this._actualBet;
    }

    set actualBet(value: number) {
        this._actualBet = value;
    }

    get actualTurnIndex(): number | null {
        return this._actualTurnIndex;
    }

    set actualTurnIndex(index: number) {
        this._actualTurnIndex = index;
    }

    get actualRaiserIndex(): number | null {
        return this._actualRaiserIndex;
    }

    set actualRaiserIndex(index: number) {
        this._actualRaiserIndex = index;
    }
}

export class TurnManager {

}