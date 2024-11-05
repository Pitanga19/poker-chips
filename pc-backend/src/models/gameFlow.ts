export class BetRound {
    private _isPreFlop: boolean;
    private _smallBlind: number;
    private _bigBlind: number;
    private _actualTurnIndex: number;
    private _actualBet: number;
    private _actualMinRaise: number;
    private _actualRaiserIndex: number | null;

    constructor(isPreFlop: boolean, smallBlind: number, bigBlind: number, actualTurnIndex: number) {
        this._isPreFlop = isPreFlop;
        this._smallBlind = smallBlind;
        this._bigBlind = bigBlind;
        this._actualTurnIndex = actualTurnIndex;
        this._actualBet = 0;
        this._actualMinRaise = 0;
        this._actualRaiserIndex = null;
    }

    toJSON() {
        return {
            isPreFlop: this._isPreFlop,
            smallBlind: this._smallBlind,
            bigBlind: this._bigBlind,
            actualTurnIndex: this._actualTurnIndex,
            actualBet: this._actualBet,
            actualMinRaise: this._actualMinRaise,
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

    get actualTurnIndex(): number | null {
        return this._actualTurnIndex;
    }

    set actualTurnIndex(index: number) {
        this._actualTurnIndex = index;
    }

    get actualBet(): number {
        return this._actualBet;
    }

    set actualBet(value: number) {
        this._actualBet = value;
    }

    get actualMinRaise(): number {
        return this._actualMinRaise;
    }

    set actualMinRaise(value: number) {
        this._actualMinRaise = value;
    }

    get actualRaiserIndex(): number | null {
        return this._actualRaiserIndex;
    }

    set actualRaiserIndex(index: number) {
        this._actualRaiserIndex = index;
    }
}