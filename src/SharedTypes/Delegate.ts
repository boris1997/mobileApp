/**
 * @Delegate
 * Provides methods for using delegate functional as C# delegates
 * @type T Generic type for define type of callable methods, extends from Function interface
 */
export class Delegate<T extends Function> implements IDelegate<T> {
    callees: T[] = [];

    setCallee(arg: T): void {
        this.callees.push(arg)
    };

    setCallees(...args: T[]): void {
        args.forEach(fn => this.callees.push(fn))
    };

    call(...callArgs: any[]): void {
        this.callees.forEach(callee => callee(...callArgs))
    };

};