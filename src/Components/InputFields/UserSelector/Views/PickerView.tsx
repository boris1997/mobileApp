import React from "react";
import { IPickerItem } from "../Interfaces/IPickerItem";
import { PickerComponent } from "../Templates/Picker";

export class PickerView<T> {
    items: Array<T> | undefined;
    value: any;
    handler:(value: any) => void;
    constructor(items: Array<T>, value: any, handler: (value: any) => void) {
        this.items = items;
        this.value = value;
        this.handler = handler;
    };

    public getView() {
        return <PickerComponent<T> items={this.items} value={this.value} handler={this.handler} />
    };
};