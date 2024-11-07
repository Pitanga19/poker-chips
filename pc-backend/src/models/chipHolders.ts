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

    refundChips(amount: number = this.chips): void {
        this.addChips(amount);
        this.removePendingChips(amount);
    }

    transferChips(target: ChipHolder, amount: number = this.pendingChips): void {
        target.addChips(amount);
        this.removePendingChips(amount);
    }
}

export class Player extends ChipHolder {
    private _id: string;
    private _isPlaying: boolean;

    constructor(id: string, startingChips: number = 0) {
        super();
        this._id = id;
        this._isPlaying = true;
        this.chips = startingChips;
    }

    toJSON() {
        return {
            id: this._id,
            chips: this._chips,
            pendingChips: this._pendingChips,
            isPlaying: this._isPlaying
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
    
    payWinners(): void {
        
    }

    endPot(): void {
        
    }
}