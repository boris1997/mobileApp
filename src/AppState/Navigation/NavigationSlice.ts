import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { IRoleWorkspaceModel } from '../../Navigation/Interfaces/IRoleWorkspaceModel';
import { INavigationState } from './Interfaces/INavigationState';
import * as _ from 'lodash'

const initialState: INavigationState = {
    chekedItemId: undefined,
    model: undefined,
    workspaceList: undefined,
    filter: null,
    searchString: ''
};

const selectSelf = (state: INavigationState) => state
const Selector = createSelector(selectSelf, (state) => state)
export const navigationSelector = Selector(initialState)

const NavigationSlice = createSlice({
    name: 'Navigation',
    initialState,
    reducers: {
        setChekedItemId(state, action: PayloadAction<string | undefined>) {
            state.chekedItemId = action.payload
        },
        setModel(state, action: PayloadAction<Array<IRoleWorkspaceModel> | undefined>) {
            state.model = action.payload
        },
        setWorkspaceList(state, action: PayloadAction<Array<IRoleWorkspaceModel> | undefined>) {
            state.workspaceList = action.payload
        },
        setFilter(state, action: PayloadAction<string[]>) {
            state.filter = action.payload
        },

        setSearchString(state, action: PayloadAction<string>) {
            state.searchString = action.payload;
        }
    },
})

export const {
    setChekedItemId,
    setModel,
    setFilter,
    setWorkspaceList,
    setSearchString
} = NavigationSlice.actions
export default NavigationSlice.reducer