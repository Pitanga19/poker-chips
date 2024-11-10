export enum BettingStageType {
    PreFlop = 'preFlop',
    Flop = 'flop',
    Turn = 'turn',
    River = 'river'
}

export class BettingStage {
    private _stage: BettingStageType;
    private _doSmallBlindCheck: boolean;
    private _doBigBlindCheck: boolean;
    private _actualBetValue: number;
    private _minimumRaise: number;

    constructor(stage: BettingStageType) {
        this._stage = stage;
        this._doSmallBlindCheck = false;
        this._doBigBlindCheck = false;
        this._actualBetValue = 0;
        this._minimumRaise = 0;
    }

    toJSON() {
        return {
            stage: this._stage,
            doSmallBlindCheck: this.doSmallBlindCheck,
            doBigBlindCheck: this.doBigBlindCheck,
            actualBetValue: this._actualBetValue,
            minimumRaise: this._minimumRaise
        }
    }
    
    get stage(): BettingStageType {
        return this._stage;
    }

    set stage(stage: BettingStageType) {
        this._stage = stage;
    }

    get doSmallBlindCheck(): boolean {
        return this._doSmallBlindCheck
    }

    setSmallBlindCheck(): void {
        this._doSmallBlindCheck = true;
    }

    removeSmallBlindCheck(): void {
        this._doSmallBlindCheck = false;
    }

    get doBigBlindCheck(): boolean {
        return this._doBigBlindCheck
    }

    setBigBlindCheck(): void {
        this._doBigBlindCheck = true;
    }

    removeBigBlindCheck(): void {
        this._doBigBlindCheck = false;
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

    reset(stage: BettingStageType) {
        this._stage = stage;
        this._doSmallBlindCheck = false;
        this._doBigBlindCheck = false;
        this._actualBetValue = 0;
        this._minimumRaise = 0;
    }
}

export class HandStage {
    private _smallBlindValue: number;
    private _bigBlindValue: number;

    constructor(smallBlindValue: number, bigBlindValue:number) {
        this._smallBlindValue = smallBlindValue;
        this._bigBlindValue = bigBlindValue;
    }

    toJSON() {
        return {
            smallBlindValue: this._smallBlindValue,
            bigBlindValue: this._bigBlindValue,
        }
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
    // manage the hand, when it starts or end
}