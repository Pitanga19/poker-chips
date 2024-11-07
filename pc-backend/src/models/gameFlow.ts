export enum StageType {
    PreFlop = 'preFlop',
    Flop = 'flop',
    Turn = 'turn',
    River = 'river'
}

export class BettingStage {
    private _stage: StageType;
    private _doSmallBlindCheck: boolean;
    private _doBigBlindCheck: boolean;
    private _smallBlindValue: number;
    private _bigBlindValue: number;
    private _actualBetValue: number;
    private _minimumRaise: number;

    constructor(stage: StageType, smallBlindValue: number, bigBlindValue:number) {
        this._stage = stage;
        this._doSmallBlindCheck = false;
        this._doBigBlindCheck = false;
        this._smallBlindValue = smallBlindValue;
        this._bigBlindValue = bigBlindValue;
        this._actualBetValue = 0;
        this._minimumRaise = 0;
    }

    toJSON() {
        return {
            stage: this._stage,
            doSmallBlindCheck: this.doSmallBlindCheck,
            doBigBlindCheck: this.doBigBlindCheck,
            smallBlindValue: this._smallBlindValue,
            bigBlindValue: this._bigBlindValue,
            actualBetValue: this._actualBetValue,
            minimumRaise: this._minimumRaise
        }
    }
    
    get stage(): StageType {
        return this._stage;
    }

    set stage(stage: StageType) {
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

    reset(stage: StageType, smallBlindValue: number, bigBlindValue:number) {
        this._stage = stage;
        this._doSmallBlindCheck = false;
        this._doBigBlindCheck = false;
        this._smallBlindValue = smallBlindValue;
        this._bigBlindValue = bigBlindValue;
        this._actualBetValue = 0;
        this._minimumRaise = 0;
    }
}