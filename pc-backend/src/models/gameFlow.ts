export enum StagesList {
    PreFlop = 'preFlop',
    Flop = 'flop',
    Turn = 'turn',
    River = 'river'
}

export class BetRound {
    private _stage: StagesList;
    private _smallBlindValue: number;
    private _bigBlindValue: number;
    private _actualBetValue: number;
    private _minimumRaise: number;

    constructor(stage: StagesList, smallBlindValue: number, bigBlindValue:number, ) {
        this._stage = stage;
        this._smallBlindValue = smallBlindValue;
        this._bigBlindValue = bigBlindValue;
        this._actualBetValue = 0;
        this._minimumRaise = 0;
    }

    toJSON() {
        return {
            stage: this._stage,
            smallBlindValue: this._smallBlindValue,
            bigBlindValue: this._bigBlindValue,
            actualBetValue: this._actualBetValue,
            minimumRaise: this._minimumRaise
        }
    }
    
    get stage(): StagesList {
        return this._stage;
    }

    set stage(stage: StagesList) {
        this._stage = stage;
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