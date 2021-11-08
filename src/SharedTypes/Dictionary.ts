/** 
 * @Dictionary 
 * provides type definition for object as C# dictionary
 * 
 * @param T generic type for set type of value array
 * 
*/
declare type Dictionary<T> = { [key: string]: Array<T> };