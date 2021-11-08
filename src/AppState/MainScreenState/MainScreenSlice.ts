import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SavedCurrentData } from '../../Authentication/Data/Data';
import { IObject } from '../../MainScreen/Interfaces/IObject';
import { IObjectProps } from '../../MainScreen/Interfaces/IObjectProps';
import { ITempateInfo } from '../../MainScreen/Interfaces/ITemplateInfo';
import { IMainScreenState } from './Interfaces/IMainScreenState';

const initialState: IMainScreenState = {
    header: 'Main screen',
    previousHeader: undefined,
    objectModel: undefined,
    passedObject: undefined,
    userData: undefined,
    templateOptions: undefined
};

const MainScreenSlice = createSlice({
    name: 'MainScreen',
    initialState,
    reducers: {
        setHeader(state, action: PayloadAction<any>) {
            state.header = action.payload
        },

        setPreviousHeader(state, action: PayloadAction<any>) {
            state.previousHeader = action.payload
        },

        setObjectModel(state, action: PayloadAction<IObject | undefined>) {
            state.objectModel = action.payload
        },

        setPassedObject(state, action: PayloadAction<IObjectProps>) {
            state.passedObject = action.payload
        },

        setUserData(state, action: PayloadAction<SavedCurrentData>) {
            state.userData = action.payload
        },

        setTemplateOptions(state, action: PayloadAction<ITempateInfo>) {
            state.templateOptions = action.payload;
        },

        resedPassedObject(state) {
            state.passedObject = undefined;
        }
    }
})

export const {
    setHeader,
    setPreviousHeader,
    setObjectModel,
    setPassedObject,
    setUserData,
    setTemplateOptions,
    resedPassedObject
} = MainScreenSlice.actions
export default MainScreenSlice.reducer