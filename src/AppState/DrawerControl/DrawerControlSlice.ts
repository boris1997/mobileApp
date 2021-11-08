import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TargetView } from './Enums/TargetView';
import { DrawerControlState } from './Interfaces/DrawerControlState';

const initialState: DrawerControlState = {
    isOpen: false,
    targetView: TargetView.undefined,
    navigation: undefined
};

const DrawerControlSlice = createSlice({
    name: 'DrawerControl',
    initialState,
    reducers: {
        toggleRightDrawer(state, action: PayloadAction<boolean>) {
            state.isOpen = action.payload;
        },

        changeTargetView(state, action: PayloadAction<TargetView>) {
            state.targetView = action.payload;
        },

    }
})

export const { toggleRightDrawer, changeTargetView } = DrawerControlSlice.actions;
export default DrawerControlSlice.reducer