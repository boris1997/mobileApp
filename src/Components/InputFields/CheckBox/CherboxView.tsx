import React from 'react';
import { Text, View } from 'react-native';
import { Checkbox } from 'native-base';
import { CheckBoxStyle } from './CheckBoxStyle';

export class CheckboxView {
    private isChecked: boolean;
    private value: string;
    private label: string;
    private handler: (value: boolean) => void;
    constructor(isChecked: boolean, value: string, label: string, handler: (value: boolean) => void) {
        this.isChecked = isChecked;
        this.value = value;
        this.label = label;
        this.handler = handler;
    };

    /**
     * @getView
     */
    public getView() {
        return (
            <View style={CheckBoxStyle.boxView}>
                <Checkbox 
                accessibilityLabel='1' 
                value={this.value} 
                isChecked={this.isChecked != undefined ? this.isChecked : false} 
                onChange={() => this.handler(!this.isChecked)} 
                />
                <Text style={CheckBoxStyle.text}>{this.label}</Text>
            </View>
        );
    };

};