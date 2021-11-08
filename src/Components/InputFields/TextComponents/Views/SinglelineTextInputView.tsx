import React from "react";
import { KeyboardType } from "react-native";
import Templates from "../../../TemplatesIndex";

export class SingleLineTextInputView {
    value: string | undefined;
    isDisabled: boolean;
    keyboardType: KeyboardType | undefined;
    handler: (text: string) => void;
    constructor(value: string | undefined, isDisabled: boolean, handler: (text: string) => void, keyboardType?: KeyboardType) {
        this.value = value
        this.isDisabled = isDisabled
        this.keyboardType = keyboardType;
        this.handler = handler;
    };

    public getView() {
        return <Templates.SingleLineText keyboardType={this.keyboardType} value={this.value} isDisabled={this.isDisabled} handler={this.handler} />
    };

};