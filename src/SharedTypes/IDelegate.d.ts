/**
 * @IDelegate
 * Provides api for using delegate functional as C# delegates
 * @type T Generic type for define type of callable methods in concrete implementation
 */
declare interface IDelegate<T> {
    callees: T[]

    /**
    * @setCallee
    * Implementation of the method for adding one function corresponding to the type T to the invokations list
    * 
    * @returns void
    */
    setCallee(arg: T): void;


    /**
     * @setCallees
     * Implementation of the method for adding many functions corresponding to the type T to the invokations list
     * 
     * @returns void
     */
    setCallees(...args: T[]): void;

    /**
     * @call
     * Implementation of the method for call each method in invokations list
     * 
     * @returns void or Promise<void>
     */
    call(...callArgs: any[]): void | Promise<void>;

};