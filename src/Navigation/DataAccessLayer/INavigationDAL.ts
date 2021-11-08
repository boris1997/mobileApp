import { NavigationItemModel } from "../Interfaces/NavigationItemModel";
export interface INavigationDAL {

    /** 
     * @NavigationRoot
     * Возваращает первые два уровня дерева навигации
     * @property filter: null - returns all workspaces
     * @property filter: [] - returns empty array of workspaces
     * @property filter: ["workspace.1", "workspace.2"] - returns requested workspaces
    */ 
    getNavigationRoot(filter: string[] | null, searchString: string): Promise<void>;

    /** 
     * @LoadNavigationItem
     * Догружает для заданной группы данные по всем её подгруппам
     * @returns Возвращает объект со всеми собственными перечисляемыми свойствами
    */
    GetNextItems(id: string): Promise<void>;

    /** 
     * @getChildrenFor
     * @returns Mодели дочерних элементов для выбранного элемента
     * по его id
    */
    getChildrenFor(id: string): NavigationItemModel[] | undefined


    /** 
     * @notifyMainScreen
     * navigation notification for mainscreen
    */
    notifyMainScreen(data: any): void;

};
