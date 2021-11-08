import { IPickerItem } from "./IPickerItem";

export interface IPickerSelector<T> {
    items: T[] | undefined;
    value: string;
    handler: (value: string) => void;
    isRequired?: boolean;
    isReadOnly?: boolean;
    isDisabled?: boolean;
};