class ArrayManager {
    private _isLoop: boolean;

    constructor(isLoop: boolean){
        this._isLoop = isLoop;
    }
    
    get isLoop(): boolean {
        return this._isLoop;
    }
    
    set isLoop(boolean: boolean){
        this._isLoop = boolean;
    }

    getNextIndex(array: any[], index: number): number {
        if (index < array.length -1){
            return index +1;
        } else {
            return this._isLoop ? 0 : index; 
        }
    }

    getPreviousIndex(array: any[], index: number): number {
        if (index > 0){
            return index - 1;
        } else {
            return this._isLoop ? array.length -1 : 0;
        }
    }

    getRandomIndex(array: any[]): number {
        return Math.floor(Math.random() * array.length);
    }
}

export const loopArrayManager = new ArrayManager(true);
export const noLoopArrayManager = new ArrayManager(false);