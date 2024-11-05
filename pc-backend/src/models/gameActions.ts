import { Player, Pot } from './chipHolders'
import { BetRound } from './gameFlow';

export enum TurnOption {
    PutSmallBlind = 'putSmallBlind',
    PutBigBlind = 'putBigBlind',
    Check = 'check',
    Bet = 'bet',
    Call = 'call',
    Raise = 'raise',
    Fold = 'fold'
}

export class TurnOptionsManager {
    getOptions(p: Player, br: BetRound): TurnOption[] {
        const options: TurnOption[] = [];

        if (br.actualBet < br.bigBlind) {
            br.isPreFlop ? this.handleBlinds(p, options) : options.push(TurnOption.Check, TurnOption.Bet, TurnOption.Fold);
        } else if (br.actualBet === br.bigBlind && p.isBigBlind) {
            options.push(TurnOption.Check, TurnOption.Raise, TurnOption.Fold);
        } else {
            options.push(TurnOption.Call, TurnOption.Raise, TurnOption.Fold);
        }

        return options;
    }

    handleBlinds(p:Player, options: TurnOption[]): void {
        if (p.isSmallBlind) {
            options.push(TurnOption.PutSmallBlind);
        } else if (p.isBigBlind){
            options.push(TurnOption.PutBigBlind);
        } else {
            console.error('Blinds error.')
        }
    }
}

export class GameActions {
    putSmallBlind(p:Player, br:BetRound){
        p.prepareChips(br.smallBlind);
        p.endTurn();
    }
    
    putBigBlind(p:Player, br:BetRound){
        br.actualMinRaise = br.bigBlind;
        br.actualBet = br.bigBlind;
        p.prepareChips(br.bigBlind);
        p.endTurn();
    }
    
    check(p:Player, br:BetRound){
        p.endTurn();
    }
    
    bet(p:Player, br:BetRound, amount: number){
        if (amount >= br.bigBlind){
            br.actualMinRaise = amount;
            br.actualBet = amount;
            p.prepareChips(amount);
            p.endTurn();
        } else {
            console.error('Invalid amount.')
        }
    }
    
    call(p:Player, br:BetRound){
        p.prepareChips(br.actualBet);
        p.endTurn();
    }
    
    raise(p:Player, br:BetRound, amount: number){
        if (amount >= br.actualBet + br.actualMinRaise){
            br.actualMinRaise = amount - br.actualBet;
            br.actualBet = amount;
            p.prepareChips(p.pendingChips - amount);
            p.endTurn();
        } else {
            console.error('Invalid amount.')
        }
    }
    
    fold(p:Player, br:BetRound){
        p.prepareChips(br.bigBlind);
        p.endTurn();
    }
}