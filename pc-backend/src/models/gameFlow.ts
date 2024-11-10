import { BettingStageType, TurnValidationType } from "../utils/constants";
import { loopArrayManager } from '../utils/arrayManager';
import { Player, PlayerManager, Pot } from "./chipHolders";

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

export class BettingStageValidator {
    // manage the start and end of betting stages
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

export class PositionManager {
    private _dealerIndex: number;
    private _smallBlindIndex: number;
    private _bigBlindIndex: number;
    private _turnIndex: number;
    private _raiserIndex: number;
    private _winnersIndex: number[];

    constructor () {
        this._dealerIndex = -1;
        this._smallBlindIndex = -1;
        this._bigBlindIndex = -1;
        this._turnIndex = -1;
        this._raiserIndex = -1;
        this._winnersIndex = [];
    }

    toJSON() {
        return {
            dealerIndex: this._dealerIndex,
            smallBlindIndex: this._smallBlindIndex,
            bigBlindIndex: this._bigBlindIndex,
            turnIndex: this._turnIndex,
            raiserIndex: this._raiserIndex,
            winnersIndex: this._winnersIndex
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

    get winnersIndex(): number[] {
        return this._winnersIndex;
    }

    set winnersIndex(indexList: number[]) {
        this._winnersIndex = indexList;
    }

    checkIsPlaying(playerList: Player[], index: number): boolean {
        return playerList[index].isPlaying && playerList[index].chips > 0;
    }

    findFirstPlayingIndex(playerList: Player[], index: number): number {
        let firstPlayingDealerIndex = index;
        let checkedPlayingCount = 0;

        while (!this.checkIsPlaying(playerList, firstPlayingDealerIndex) && checkedPlayingCount < playerList.length) {
            firstPlayingDealerIndex = loopArrayManager.getNextIndex(playerList, firstPlayingDealerIndex);
            checkedPlayingCount++;
        }
        
        return firstPlayingDealerIndex;
    }

    initializePositions(playerList: Player[], dealerIndex: number): void {
        this._dealerIndex =  this.findFirstPlayingIndex(playerList, dealerIndex);
        this._smallBlindIndex = this.findFirstPlayingIndex(playerList,
            loopArrayManager.getNextIndex(playerList, this._dealerIndex));
        this._bigBlindIndex = this.findFirstPlayingIndex(playerList,
            loopArrayManager.getNextIndex(playerList, this._smallBlindIndex));
        this._turnIndex = this._smallBlindIndex;
        this._raiserIndex = -1;
        this._winnersIndex = [];
    }

    updateNextTurn(playerList: Player[]): void {
        this._turnIndex = loopArrayManager.getNextIndex(playerList, this._turnIndex);
    }

    updateNextStage(): void {
        this._turnIndex = this._smallBlindIndex;
        this._raiserIndex = -1;
    }

    updateNextHand(playerList: Player[]): void {
        const nextDealer = loopArrayManager.getNextIndex(playerList, this._dealerIndex);
        this.initializePositions(playerList, nextDealer);
    }
}

export class TurnValidator {
    validate(playerList: Player[], positionManager: PositionManager, bettingStage: BettingStage, handStage: HandStage): TurnValidationType {
        const currentPlayer: Player = playerList[positionManager.turnIndex];
        const arePlaying = playerList.filter(p => p.isPlaying);
        const isAlone = arePlaying.length === 1;
        const isRaiser = positionManager.turnIndex === positionManager.raiserIndex;
        const doBigBlindCheck = bettingStage.doBigBlindCheck;
        const doAllCheck = positionManager.turnIndex === positionManager.smallBlindIndex && bettingStage.doSmallBlindCheck;
        const isEveryoneAllIn = arePlaying.filter(p => p.chips > 0).length == 1;
        const isPlaying = currentPlayer.isPlaying;
        const mustEqualBet = currentPlayer.pendingChips < bettingStage.actualBetValue;
        const isBigBlindWithoutActionInPreFlop = (
            positionManager.turnIndex === positionManager.bigBlindIndex &&
            currentPlayer.pendingChips === handStage.bigBlindValue &&
            bettingStage.stage === BettingStageType.PreFlop
        );

        if (isAlone || isRaiser || doBigBlindCheck || doAllCheck || isEveryoneAllIn) {
            return TurnValidationType.FinishRound;
        } else if (isPlaying && (mustEqualBet || isBigBlindWithoutActionInPreFlop)) {
            return TurnValidationType.GiveActions;
        } else {
            return TurnValidationType.NextTurn;
        }
    }
}