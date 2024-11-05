
export class BetRound {
    private _isPreFlop: boolean;
    private _smallBlindValue: number;
    private _bigBlindValue: number;
    private _actualBetValue: number;
    private _minimumRaise: number;

    constructor(isPreFlop: boolean, smallBlindValue: number, bigBlindValue:number, ) {
        this._isPreFlop = isPreFlop;
        this._smallBlindValue = smallBlindValue;
        this._bigBlindValue = bigBlindValue;
        this._actualBetValue = 0;
        this._minimumRaise = 0;
    }

    toJSON() {
        return {
            isPreFlop: this._isPreFlop,
            smallBlindValue: this._smallBlindValue,
            bigBlindValue: this._bigBlindValue,
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