export const PORT = 3000;
export const IP = 'localhost';

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

enum BettingStageType {
    PreFlop = 'preFlop',
    Flop = 'flop',
    Turn = 'turn',
    River = 'river'
}