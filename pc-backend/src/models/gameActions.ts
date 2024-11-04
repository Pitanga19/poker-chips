import { Player, Pot } from './chipHolders'
import { BetRound } from './gameFlow';

export class TurnOptionsManager {
    private _options: string[];

    constructor() {
        this._options = ['putSB', 'putBB', 'check', 'bet', 'call', 'raise', 'fold'];
    }

    getOptions(p: Player, br: BetRound) {
        let avalibeOptions = [];
        if (br.actualBet < br.bigBlind) {
            if (br.isPreFlop) {
                if (p.isSmallBlind) {
                    avalibeOptions = ['putSB']
                } else if (p.isBigBlind) {
                    avalibeOptions = ['putBB']
                } else {
                    console.error('Error con las ciegas.')
                };
            } else {
                avalibeOptions = ['check', 'bet', 'fold'];
            };
        } else if (br.actualBet == br.bigBlind && p.isBigBlind) {
            avalibeOptions = ['check', 'bet', 'fold'];
        } else {
            avalibeOptions = ['call', 'raise', 'fold'];
        };
    }
}

export class GameActions {
    
}