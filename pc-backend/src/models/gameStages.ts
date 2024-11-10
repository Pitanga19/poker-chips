import { BettingStageType } from "../utils/constants";
import { Player, PlayerManager, Pot } from "./chipHolders";
import { PositionManager, HandStageValidator, BettingStageValidator, TurnValidator } from "./gameFlow";

export class Game {
    private _playerManager: PlayerManager;
    private _handStage: HandStage;
    private _bettingStageValidator: BettingStageValidator;
    private _bettingStage: BettingStage;
    private _positionManager: PositionManager;
    private _turnValidator: TurnValidator;

    constructor () {
        this._playerManager = new PlayerManager();
        this._handStage = new HandStage();
        this._bettingStageValidator = new BettingStageValidator();
        this._bettingStage = new BettingStage();
        this._positionManager = new PositionManager();
        this._turnValidator = new TurnValidator();
    }

    toJSON() {
        return {
            playerManager: this._playerManager,
            handStage: this._handStage,
            bettingStageValidator: this._bettingStageValidator,
            bettingStage: this._bettingStage,
            positionManager: this._positionManager,
            turnValidator: this._turnValidator,
        }
    }

    get playerManager(): PlayerManager {
        return this._playerManager;
    }

    set playerManager(playerManager: PlayerManager) {
        this._playerManager = playerManager;
    }

    get handStage(): HandStage {
        return this._handStage;
    }

    set handStage(handStage: HandStage) {
        this._handStage = handStage;
    }

    get bettingStageValidator(): BettingStageValidator {
        return this._bettingStageValidator;
    }

    set bettingStageValidator(bettingStageValidator: BettingStageValidator) {
        this._bettingStageValidator = bettingStageValidator;
    }

    get bettingStage(): BettingStage {
        return this._bettingStage;
    }

    set bettingStage(bettingStage: BettingStage) {
        this._bettingStage = bettingStage;
    }

    get positionManager(): PositionManager {
        return this._positionManager;
    }

    set positionManager(positionManager: PositionManager) {
        this._positionManager = positionManager;
    }

    get turnValidator(): TurnValidator {
        return this._turnValidator;
    }

    set turnValidator(turnValidator: TurnValidator) {
        this._turnValidator = turnValidator;
    }
}

export class HandStage {
    private _smallBlindValue: number;
    private _bigBlindValue: number;
    private _pot: Pot;

    constructor() {
        this._smallBlindValue = 0;
        this._bigBlindValue = 0;
        this._pot = new Pot();
    }

    toJSON() {
        return {
            smallBlindValue: this._smallBlindValue,
            bigBlindValue: this._bigBlindValue,
            pot: this._pot,
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

export class BettingStage {
    private _stage: BettingStageType;
    private _doSmallBlindCheck: boolean;
    private _doBigBlindCheck: boolean;
    private _actualBetValue: number;
    private _minimumRaise: number;

    constructor() {
        this._stage = BettingStageType.PreFlop;
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

    reset(stage: BettingStageType): void {
        this._stage = stage;
        this._doSmallBlindCheck = false;
        this._doBigBlindCheck = false;
        this._actualBetValue = 0;
        this._minimumRaise = 0;
    }
}