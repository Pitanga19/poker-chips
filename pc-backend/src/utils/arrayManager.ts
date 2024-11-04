export default class ArrayManager {
    private _array: any[];
    private _isLoop: boolean;
    private _actualIndex: number;

    constructor(array: any[], isLoop: boolean, actualIndex: number = 0){
        this._array = array;
        this._isLoop = isLoop;
        this._actualIndex = actualIndex;
    }

    get array(): any[] {
        return this._array;
    }

    set array(array: any[]) {
        this._array = array;
    }

    get actualIndex(): number {
        return this._actualIndex;
    }

    set actualIndex (index: number) {
        this._actualIndex = index;
    }

    get isLoop(): boolean {
        return this._isLoop;
    }

    set isLoop(boolean: boolean){
        this._isLoop = boolean;
    }

    getNextIndex(): number {
        if (this._actualIndex < this._array.length -1){
            return this._actualIndex +1;
        } else {
            if (this._isLoop){
                return 0;
            } else {
                return this._actualIndex;
            }
        }
    }

    getPreviousIndex(): number {
        if (this._actualIndex > 0){
            return this._actualIndex - 1;
        } else {
            if (this._isLoop) {
                return this._array.length -1;
            } else {
                return 0;
            }
        }
    }
}