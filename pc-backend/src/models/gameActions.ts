import { Player, Pot } from './chipHolders'
import { BetRound } from './gameFlow';

type TurnOption = 'putSmallBlind' | 'putBigBlind' | 'check' | 'bet' | 'call' | 'raise' | 'fold';

export class TurnOptionsManager {
    getOptions(p: Player, br: BetRound): TurnOption[] {
        const options: TurnOption[] = [];

        if (br.actualBet < br.bigBlind) {
            br.isPreFlop ? this.handleBlinds(p, br, options) : options.push('check', 'bet', 'fold');
        } else if (br.actualBet === br.bigBlind && p.isBigBlind) {
            options.push('check', 'raise', 'fold');
        } else {
            options.push('call', 'raise', 'fold');
        }

        return options;
    }

    handleBlinds(p:Player, br:BetRound, options: TurnOption[]): void {
        if (p.isSmallBlind) {
            options.push('putSmallBlind');
        } else if (p.isBigBlind){
            options.push('putBigBlind');
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