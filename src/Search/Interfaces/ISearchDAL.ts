import { IObjectProps } from '../../MainScreen/Interfaces/IObjectProps';
import { SearchFilter } from '../DataAccessLayer/SearchFilter';

export interface ISearchDAL {
    /**
     * @search 
     * 
     */
    search(filter: SearchFilter): Promise<void>;

    notifyMainScreen(objData: IObjectProps): void

};

