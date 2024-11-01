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
        this.removeChips(amount);
        this.addPendingChips(amount);
    }

    transferChips(target: ChipHolder, amount: number = this.pendingChips): void {
        target.addChips(amount);
        this.removePendingChips(amount);
    }
}