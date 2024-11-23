export const PORT = 3000;
export const IP = '127.0.0.1';
export const API_URL = `http://${IP}:${PORT}/api`;

export enum toExecuteValidatorType {
    HandStageValidator = 'handStageValidator',
    BettingStageValidator = 'bettingStageValidator',
    TurnValidator = 'turnValidator',
    ActionSelector = 'actionSelector',
    WinnerSelector = 'winnerSelector',
    GameOver = 'gameOver'
}

export enum ActionType {
    PutSmallBlind = 'putSmallBlind',
    PutBigBlind = 'putBigBlind',
    CheckSmallBlind = 'checkSmallBlind',
    CheckBigBlind = 'checkBigBlind',
    Check = 'check',
    Bet = 'bet',
    Call = 'call',
    Raise = 'raise',
    MustAllIn = 'allIn',
    RaiseAllIn = 'raiseAllIn',
    Fold = 'fold'
}

export enum BettingStageType {
    PreFlop = 'preFlop',
    Flop = 'flop',
    Turn = 'turn',
    River = 'river'
}

// models interfaces
export interface Pot {
    id: number;
    activePlayerIds: string[];
    chips: number;
    pendingChips: number;
};

export interface Player {
    id: string;
    chips: number;
    pendingChips: number;
    isPlaying: boolean;
};

export interface PlayerManager {
    playerList: Player[];
};

export interface PositionManager {
    dealerIndex: number;
    smallBlindIndex: number;
    bigBlindIndex: number;
    turnIndex: number;
    raiserIndex: number;
    winnersIndex: number[];
};

export interface HandStage {
    smallBlindValue: number;
    bigBlindValue: number;
    stagesPlayed: BettingStageType[];
}

export interface BettingStage {
    stage: BettingStageType,
    doBigBlindCheck: boolean,
    actualBetValue: number,
    minimumRaise: number,
    checkCount: number
}