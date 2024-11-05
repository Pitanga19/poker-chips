export class BetRound {
    private _isPreFlop: boolean;
    private _smallBlindValue: number;
    private _bigBlindValue: number;
    private _dealerIndex: number;
    private _smallBlindIndex: number;
    private _bigBlindIndex: number;
    private _turnIndex: number;
    private _raiserIndex: number;
    private _actualBetValue: number;
    private _minimumRaise: number;

    constructor(isPreFlop: boolean, smallBlindValue: number, bigBlindValue:number, dealerIndex:number, smallBlindIndex: number, bigBlindIndex: number, turnIndex: number) {
        this._isPreFlop = isPreFlop;
        this._smallBlindValue = smallBlindValue;
        this._bigBlindValue = bigBlindValue;
        this._dealerIndex = dealerIndex;
        this._smallBlindIndex = smallBlindIndex;
        this._bigBlindIndex = bigBlindIndex;
        this._turnIndex = turnIndex;
        this._raiserIndex = -1;
        this._actualBetValue = 0;
        this._minimumRaise = 0;
    }

    toJSON() {
        return {
            isPreFlop: this._isPreFlop,
            smallBlindValue: this._smallBlindValue,
            bigBlindValue: this._bigBlindValue,
            dealerIndex: this._dealerIndex,
            smallBlindIndex: this._smallBlindIndex,
            bigBlindIndex: this._bigBlindIndex,
            turnIndex: this._turnIndex,
            raiserIndex: this._raiserIndex,
            actualBetValue: this._actualBetValue,
            minimumRaise: this._minimumRaise
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

    get smallBlindValue(): number {
        return this._smallBlindValue
    }

    set smallBlindValue(value: number) {
        this._smallBlindValue = value;
    }

    get bigBlindValue(): number {
        return this._bigBlindValue;
    }

    set bigBlindValue(value: number) {
        this._bigBlindValue = value;
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

    get actualBetValue(): number {
        return this._actualBetValue;
    }

    set actualBetValue(value: number) {
        this._actualBetValue = value;
    }

    get minimumRaise(): number {
        return this._minimumRaise;
    }

    set minimumRaise(value: number) {
        this._minimumRaise = value;
    }
}