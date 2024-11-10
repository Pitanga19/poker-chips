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
    Fold = 'fold'
}

export enum BettingStageType {
    PreFlop = 'preFlop',
    Flop = 'flop',
    Turn = 'turn',
    River = 'river'
}

export enum HandStageValidationType {
    StartHandStage = 'startHandStage',
    EndGame = 'endGame'
}

export enum BettingStageValidationType {
    StartBettingStage = 'startBettingStage',
    EndHandStage = 'endHand'
}

export enum TurnValidationType {
    GiveActions = 'giveActions',
    SkipPlayer = 'nextTurn',
    EndBettingStage = 'finishRound'
}
