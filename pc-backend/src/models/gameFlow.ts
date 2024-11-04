import * as chips from './chipHolders'

export class BetRound {
    private _isPreFlop: boolean;
    private _smallBlind: number;
    private _bigBlind: number;
    private _initialBet: number;
    private _actualBet: number;
    private _actualRaiser: chips.Player | null;

    constructor(isPreFlop: boolean, smallBlind: number, bigBlind: number) {
        this._isPreFlop = isPreFlop;
        this._smallBlind = smallBlind;
        this._bigBlind = bigBlind;
        this._initialBet = 0;
        this._actualBet = 0;
        this._actualRaiser = null;
    }

    toJSON() {
        return {
            isPreFlop: this._isPreFlop,
            smallBlind: this._smallBlind,
            bigBlind: this._bigBlind,
            initialBet: this._initialBet,
            actualBet: this._actualBet,
            actualRaiser: this._actualRaiser
        }
    }

    get isPreFlop(): boolean {
        return this._isPreFlop;
    }

    setPreFlop(): void {
        this._isPreFlop = true;
    }

    clearPreFlop(): void {
        this._isPreFlop = false;
    }

    get smallBlind(): number {
        return this._smallBlind;
    }

    set smallBlind(value: number) {
        this._smallBlind = value;
    }

    get bigBlind(): number {
        return this._bigBlind;
    }

    set bigBlind(value: number) {
        this._bigBlind = value;
    }

    get initialBet(): number {
        return this._initialBet;
    }

    set initialBet(value: number) {
        this._initialBet = value;
    }

    get actualBet(): number {
        return this._actualBet;
    }

    set actualBet(value: number) {
        this._actualBet = value;
    }

    get actualRaiser(): chips.Player | null {
        return this._actualRaiser;
    }

    set actualRaiser(player: chips.Player) {
        this._actualRaiser = player;
    }
}

export class TurnManager {
    private _betRound: BetRound;
    private _playerList: chips.Player[];

    constructor(betRound: BetRound, playerList: chips.Player[]){
        this._betRound = betRound;
        this._playerList = playerList;
    }

    toJSON() {
        return {
            betRound: this._betRound,
            playerList: this._playerList
        }
    }

    get betRound(): BetRound {
        return this._betRound;
    }

    set betRound(betRound: BetRound) {
        this._betRound = betRound;
    }

    get playerList(): BetRound {
        return this._betRound;
    }

    set playerList(playerList: chips.Player[]) {
        this._playerList = playerList;
    }
}