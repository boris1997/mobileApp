import { TargetView } from "../Enums/TargetView";

export interface DrawerControlState {
    isOpen: boolean;
    targetView: TargetView;
    navigation: any;
};