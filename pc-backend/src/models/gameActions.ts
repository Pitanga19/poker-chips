import { Player, Pot } from './chipHolders'
import { BetRound } from './gameFlow';

export enum ActionsList {
    PutSmallBlind = 'putSmallBlind',
    PutBigBlind = 'putBigBlind',
    Check = 'check',
    Bet = 'bet',
    Call = 'call',
    Raise = 'raise',
    Fold = 'fold'
}

export class ActionSelector {
    getOptions(p: Player, br: BetRound): ActionsList[] {
        const options: ActionsList[] = [];

        if (br.actualBetValue < br.bigBlindValue) {
            br.isPreFlop ? this.handleBlinds(p, options) : options.push(ActionsList.Check, ActionsList.Bet, ActionsList.Fold);
        } else if (br.actualBetValue === br.bigBlindValue && p.isBigBlind) {
            options.push(ActionsList.Check, ActionsList.Raise, ActionsList.Fold);
        } else {
            options.push(ActionsList.Call, ActionsList.Raise, ActionsList.Fold);
        }

        return options;
    }

    handleBlinds(p:Player, options: ActionsList[]): void {
        if (p.isSmallBlind) {
            options.push(ActionsList.PutSmallBlind);
        } else if (p.isBigBlind){
            options.push(ActionsList.PutBigBlind);
        } else {
            console.error('Blinds error.')
        }
    }
}

export class PlayerActions {
    putSmallBlind(p:Player, br:BetRound){
        p.prepareChips(br.smallBlindValue);
        p.endTurn();
    }
    
    putBigBlind(p:Player, br:BetRound){
        br.minimumRaise = br.bigBlindValue;
        br.actualBetValue = br.bigBlindValue;
        p.prepareChips(br.bigBlindValue);
        p.endTurn();
    }
    
    check(p:Player, br:BetRound){
        p.endTurn();
    }
    
    bet(p:Player, br:BetRound, amount: number){
        if (amount >= br.bigBlindValue){
            br.minimumRaise = amount;
            br.actualBetValue = amount;
            p.prepareChips(amount);
            p.endTurn();
        } else {
            console.error('Invalid amount.')
        }
    }
    
    call(p:Player, br:BetRound){
        p.prepareChips(br.actualBetValue);
        p.endTurn();
    }
    
    raise(p:Player, br:BetRound, amount: number){
        if (amount >= br.actualBetValue + br.minimumRaise){
            br.minimumRaise = amount - br.actualBetValue;
            br.actualBetValue = amount;
            p.prepareChips(p.pendingChips - amount);
            p.endTurn();
        } else {
            console.error('Invalid amount.')
        }
    }
    
    fold(p:Player, br:BetRound){
        p.prepareChips(br.bigBlindValue);
        p.endTurn();
    }
}