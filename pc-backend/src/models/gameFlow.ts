import { Game } from "./gameStages";
import { Player } from "./chipHolders";
import { BettingStageType, toExecuteValidatorType, HandStageValidationType, BettingStageValidationType, TurnValidationType } from "../utils/constants";
import { loopArrayManager } from '../utils/arrayManager';

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
        dealerIndex = dealerIndex === -1 ? loopArrayManager.getRandomIndex(playerList) : dealerIndex;
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

export class HandStageValidator {
    validate(game: Game): HandStageValidationType {
        const playerManager = game.playerManager;

        const playerList = playerManager.playerList;
        const arePlaying = playerList.filter( p => p.isPlaying );
        const areManyPlaying = arePlaying.length > 1;
        if (areManyPlaying) {
            return HandStageValidationType.StartHandStage;
        } else {
            return HandStageValidationType.EndGame;
        }
    }

    startHandStage(game: Game): toExecuteValidatorType {
        const handStage = game.handStage;

        handStage.clearStages();
        return toExecuteValidatorType.BettingStageValidator;
    }

    endGame(game: Game): toExecuteValidatorType {
        const playerManager = game.playerManager;
        const playerList = playerManager.playerList;

        playerList.forEach( p => p.stopPlaying() );
        return toExecuteValidatorType.GameOver;
    }
}

export class BettingStageValidator {
    validate(game: Game): BettingStageValidationType {
        const positionManager = game.positionManager;
        const handStage = game.handStage;

        const areWinners = positionManager.winnersIndex.length > 0;
        const riverPlayed = handStage.stagesPlayed.length === 4;

        if (areWinners || riverPlayed) {
            return BettingStageValidationType.EndHandStage;
        } else {
            return BettingStageValidationType.StartBettingStage;
        }
    }

    endHand(game: Game): toExecuteValidatorType {
        const pot = game.pot;
        const playerManager = game.playerManager;
        const playerList = playerManager.playerList;
        const positionManager = game.positionManager;

        pot.payWinners(playerList, positionManager);
        playerManager.resetIsPlaying();
        positionManager.updateNextHand(playerList);
        return toExecuteValidatorType.HandStageValidator;
    }

    startBettingStage(game: Game):toExecuteValidatorType {
        const bettingStage = game.bettingStage;

        bettingStage.reset(game);
        return toExecuteValidatorType.TurnValidator;
    }
}

export class TurnValidator {
    validate(game: Game): TurnValidationType {
        const playerManager = game.playerManager;
        const playerList = playerManager.playerList;
        const positionManager = game.positionManager;
        const currentPlayer = playerList[positionManager.turnIndex]
        const bettingStage = game.bettingStage;
        const handStage = game.handStage;
        
        const arePlaying = playerList.filter(p => p.isPlaying);
        const arePlayingCount = arePlaying.length;
        const areEnoughPlaying = arePlayingCount > 1;
        const isPlaying = currentPlayer.isPlaying;
        const isRaiser = positionManager.turnIndex === positionManager.raiserIndex;
        const doBBcheck = bettingStage.doBigBlindCheck;
        const doEveryoneCheck = bettingStage.checkCount === arePlayingCount;
        const doSomeoneBet = bettingStage.actualBetValue > 0;
        const mustEqualBet = doSomeoneBet || currentPlayer.pendingChips < bettingStage.actualBetValue;

    
        if (!areEnoughPlaying || isRaiser || doBBcheck || doEveryoneCheck) {
            console.log('Ending betting stage.');
            return TurnValidationType.EndBettingStage;
        }
    
        if (!isPlaying) {
            console.log('Skipping to next player.');
            return TurnValidationType.NextPlayer;
        }
    
        if (isPlaying && ( !doSomeoneBet || mustEqualBet)) {
            console.log('Giving actions to current player.');
            return TurnValidationType.GiveActions;
        }
    
        console.error('Unexpected state in TurnValidator.');
        throw new Error('Unexpected state in TurnValidator');
    }

    endBettingStage (game: Game): toExecuteValidatorType {
        const handStage = game.handStage;
        const bettingStage = game.bettingStage;
        const positionManager = game.positionManager;

        handStage.stagesPlayed.push(bettingStage.stage);
        positionManager.updateNextStage();
        return toExecuteValidatorType.BettingStageValidator;
    }

    giveActions (game: Game): toExecuteValidatorType {
        return toExecuteValidatorType.ActionSelector;
    }

    nextPlayer (game: Game): toExecuteValidatorType {
        const positionManager = game.positionManager;
        const playerManager = game.playerManager;
        const playerList = playerManager.playerList;

        positionManager.updateNextTurn(playerList);
        return toExecuteValidatorType.TurnValidator;
    }
}