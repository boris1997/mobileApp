import { createSlice, PayloadAction, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { ISearchData } from '../../Search/Interfaces/ISearchData';
import { ISearchState } from './Interfaces/ISearchState';

//#region Initial state of state tree branch
const initialState: ISearchState = {
    model: undefined,
};
//#endregion

//#region Selector creation adn export
const selectSelf = (state: ISearchState) => state;
const Selector = createSelector(selectSelf, (state) => state);
export const searchSelector = Selector(initialState);
//#endregion

//#region Slice options
/** 
 * @SearchSlice
 * Object provided name, initial branch state and list of reduce
*/
const SearchSlice = createSlice({
    name: 'Search',
    initialState,
    reducers: {
        setSearchModel(state, action: PayloadAction<ISearchData | undefined>) {
            state.model = action.payload
        }
    }
})
//#endregion

export const { setSearchModel } = SearchSlice.actions
export default SearchSlice.reducer