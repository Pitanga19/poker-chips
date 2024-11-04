import { Player, Pot } from './chipHolders'
import { BetRound } from './gameFlow';

type TurnOption = 'check' | 'bet' | 'fold' | 'call' | 'raise' | 'putSB' | 'putBB';

export class TurnOptionsManager {
    getOptions(p: Player, br: BetRound): TurnOption[] {
        const options: TurnOption[] = [];

        if (br.actualBet < br.bigBlind) {
            br.isPreFlop ? this.handleBlinds(p, br, options) : options.push('check', 'bet', 'fold');
        } else if (br.actualBet === br.bigBlind && p.isBigBlind) {
            options.push('check', 'bet', 'fold');
        } else {
            options.push('call', 'raise', 'fold');
        }

        return options;
    }

    handleBlinds(p:Player, br:BetRound, options: TurnOption[]): void {
        if (p.isSmallBlind) {
            options.push('putSB');
        } else if (p.isBigBlind){
            options.push('putBB');
        } else {
            console.error('Blinds error.')
        }
    }
}

export class GameActions {
    
}