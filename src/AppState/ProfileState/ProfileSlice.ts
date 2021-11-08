import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { profileDAL } from '../../../App';
import { IProfileInfo } from '../../MyProfile/Interfaces/IProfileInfo';
import { TargetPicker } from './Enums/TargetPicker';
import { TargetProperties } from './Enums/TargetProperies';
import { IPickerList } from './Interfaces/IPickerList';
import { IProfileState } from './Interfaces/IProfileState';
import { IPropertyChange } from './Interfaces/IPropertyChange';

const initialState: IProfileState = {
    model: undefined,
    supervisorsList: undefined,
    //TODO add list models for language and authMethod 
};

const ProfileSlice = createSlice({
    name: 'Profile',
    initialState,
    reducers: {
        setModel(state, action: PayloadAction<IProfileInfo | undefined>) {
            state.model = action.payload;
        },

        changeTargetProp(state, action: PayloadAction<IPropertyChange>) {
            const target = action.payload.target;
            const value = action.payload.value;
            if (target === TargetProperties.authenticationMethod) {
                state.model!.authenticationMethod = value;
            };
            if (target === TargetProperties.creationDate) {
                state.model!.creationDate = value;
            };
            if (target === TargetProperties.creator) {
                state.model!.creator = value;
            };
            if (target === TargetProperties.department) {
                state.model!.department = value;
            };
            if (target === TargetProperties.fullName) {
                state.model!.fullName = value;
            };
            if (target === TargetProperties.id) {
                state.model!.id = value;
            };
            if (target === TargetProperties.isActive) {
                state.model!.isActive = value;
            };
            if (target === TargetProperties.isSystemAdministrator) {
                state.model!.isSystemAdministrator = value;
            };
            if (target === TargetProperties.language) {
                state.model!.language = value;
            };
            if (target === TargetProperties.lastLoginDate) {
                state.model!.lastLoginDate = value;
            };
            if (target === TargetProperties.lastWriteDate) {
                state.model!.lastWriteDate = value;
            };
            if (target === TargetProperties.manager) {
                state.model!.manager = value;
            };
            if (target === TargetProperties.mbox) {
                state.model!.mbox = value;
            };
            if (target === TargetProperties.office) {
                state.model!.office = value;
            };
            if (target === TargetProperties.origin) {
                state.model!.origin = value;
            };
            if (target === TargetProperties.phone) {
                state.model!.phone = value;
            };
            if (target === TargetProperties.role) {
                state.model!.role = value;
            };
            if (target === TargetProperties.IsDisabled) {
                state.model!.IsDisabled = value;
            };
            if (target === TargetProperties.username) {
                state.model!.username = value;
            };
            if (target === TargetProperties.skype) {
                state.model!.skype = value;
            };
            if (target === TargetProperties.title) {
                state.model!.title = value;
            };
        },

        setPickerList(state, action: PayloadAction<IPickerList>) {
            const target = action.payload.target;
            const value = action.payload.value;
            switch (target) {
                case TargetPicker.language: {

                };
                case TargetPicker.authenticationMethod: {

                };
                case TargetPicker.supervisor: {
                    state.supervisorsList = value;
                };
                default:
                    break;
            };
        }
    }
});

export const { setModel, changeTargetProp, setPickerList } = ProfileSlice.actions;
export default ProfileSlice.reducer;