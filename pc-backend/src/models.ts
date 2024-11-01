export class ChipHolder {
    private _chips: number;
    private _pendingChips: number;

    constructor() {
        this._chips = 0;
        this._pendingChips = 0;
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

    prepareChips(amount: number): void {
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
    private _isTurn: boolean;
    private _isWinner: boolean;

    constructor(id: string, startingChips: number = 0) {
        super();
        this._id = id;
        this._isPlaying = true;
        this._isDealer = false;
        this._isTurn = false;
        this._isWinner = false;
        this.chips = startingChips;
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
