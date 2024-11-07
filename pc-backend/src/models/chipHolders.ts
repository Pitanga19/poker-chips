import { PositionManager } from "./gameActions";
import { BettingStage } from "./gameFlow";
import { loopArrayManager } from "../utils/arrayManager";

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

    incrementChips(amount: number): void {
        this._chips += amount;
    }

    decrementChips(amount: number): void {
        this._chips -= amount;
    }

    get pendingChips(): number {
        return this._pendingChips;
    }

    set pendingChips(amount: number) {
        this._pendingChips = amount;
    }

    incrementPendingChips(amount: number): void {
        this._pendingChips += amount;
    }

    decrementPendingChips(amount: number): void {
        this._pendingChips -= amount;
    }

    prepareChips(amount: number = this.chips): void {
        this.incrementPendingChips(amount);
        this.decrementChips(amount);
    }

    refundChips(amount: number = this.chips): void {
        this.incrementChips(amount);
        this.decrementPendingChips(amount);
    }

    transferChips(target: ChipHolder, amount: number = this.pendingChips): void {
        target.incrementChips(amount);
        this.decrementPendingChips(amount);
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
    constructor() {
        super();
    }

    toJSON() {
        return {
            chips: this._chips,
            pendingChips: this._pendingChips
        }
    }
    
    payWinners(pl: Player[], pm: PositionManager, bs: BettingStage): void {
        const winnersCount: number = pm.winnersIndex.length;
        const winnersReward: number = Math.floor(this._chips / winnersCount);
        for (let i of pm.winnersIndex) {
            this.prepareChips(winnersReward);
            this.transferChips(pl[i]);
        }

        if (this._chips > 0){
            const ri = loopArrayManager.getRandomIndex(pm.winnersIndex);
            this.prepareChips(this._chips);
            this.transferChips(pl[ri])
        }
    }
}