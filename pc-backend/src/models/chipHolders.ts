export class ChipHolder {
    protected _chips: number;
    protected _pendingChips: number;

    constructor() {
        this._chips = 0;
        this._pendingChips = 0;
    }

    toJSON() {
        return {
            chips: this._chips,
            pendingChips: this._pendingChips
        }
    }

    get chips(): number {
        return this._chips;
    }

    set chips(amount: number) {
        this._chips = amount;
    }

    addChips(amount: number): void {
        this._chips += amount;
    }

    removeChips(amount: number): void {
        this._chips -= amount;
    }

    get pendingChips(): number {
        return this._pendingChips;
    }

    set pendingChips(amount: number) {
        this._pendingChips = amount;
    }

    addPendingChips(amount: number): void {
        this._pendingChips += amount;
    }

    removePendingChips(amount: number): void {
        this._pendingChips -= amount;
    }

    prepareChips(amount: number = this.chips): void {
        this.addPendingChips(amount);
        this.removeChips(amount);
    }

    transferChips(target: ChipHolder, amount: number = this.pendingChips): void {
        target.addChips(amount);
        this.removePendingChips(amount);
    }
}

export class Player extends ChipHolder {
    private _id: string;
    private _isPlaying: boolean;
    private _isDealer: boolean;
    private _isSmallBlind: boolean;
    private _isBigBlind: boolean;
    private _isTurn: boolean;
    private _isWinner: boolean;

    constructor(id: string, startingChips: number = 0) {
        super();
        this._id = id;
        this._isPlaying = true;
        this._isDealer = false;
        this._isSmallBlind = false;
        this._isBigBlind = false;
        this._isTurn = false;
        this._isWinner = false;
        this.chips = startingChips;
    }

    toJSON() {
        return {
            id: this._id,
            chips: this._chips,
            pendingChips: this._pendingChips,
            isPlaying: this._isPlaying,
            isDealer: this._isDealer,
            isSmallBlind: this._isSmallBlind,
            isBigBlind: this._isBigBlind,
            isTurn: this._isTurn,
            isWinner: this._isWinner
        }
    }

    get id(): string {
        return this._id;
    }

    set id(id: string) {
        this._id = id;
    }

    get isPlaying(): boolean {
        return this._isPlaying;
    }

    startPlaying(): void {
        this._isPlaying = true;
    }
    
    stopPlaying(): void {
        this._isPlaying = false;
    }

    get isDealer(): boolean {
        return this._isDealer;
    }

    giveDealer() {
        this._isDealer = true;
    }

    removeDealer() {
        this._isDealer = false;
    }

    get isSmallBlind(): boolean {
        return this._isSmallBlind;
    }

    giveSmallBlind() {
        this._isSmallBlind = true;
    }

    removeSmallBlind() {
        this._isSmallBlind = false;
    }

    get isBigBlind(): boolean {
        return this._isBigBlind;
    }

    giveBigBlind() {
        this._isBigBlind = true;
    }

    removeBigBlind() {
        this._isBigBlind = false;
    }
    
    get isTurn(): boolean {
        return this._isTurn;
    }
    
    startTurn(): void {
        this._isTurn = true;
    }
    
    endTurn(): void {
        this._isTurn = false;
    }

    get isWinner(): boolean {
        return this._isWinner;
    }

    makeWinner() {
        this._isWinner = true;
    }

    removeWinner() {
        this._isWinner = false;
    }
}

export class Pot extends ChipHolder {
    private _winnersCount: number;
    
    constructor() {
        super();
        this._winnersCount = 0;
    }

    toJSON() {
        return {
            chips: this._chips,
            pendingChips: this._pendingChips,
            winnersCount: this._winnersCount
        }
    }

    get winnersCount(): number {
        return this._winnersCount;
    }

    set winnersCount(value: number) {
        this._winnersCount = value;
    }

    defineWinnersCount(players: Player[]): void {
        this._winnersCount = players.filter(p => p.isWinner).length;
    }
    
    payWinners(players: Player[]): void {
        players.forEach(p => {
            if (p.isWinner) {
                this.transferChips(p, Math.floor(this.pendingChips / this._winnersCount));
            }
        })
    }

    endPot(players: Player[]): void {
        this.prepareChips();
        this.defineWinnersCount(players);
        this.payWinners(players);
        this.chips = 0;
    }
}