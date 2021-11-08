import React, { FC, useState } from 'react';
import { Input } from "native-base"
import { KeyboardType, View } from 'react-native';

interface ISingleLineTextInput {
    value: string | undefined;
    isDisabled: boolean;
    keyboardType: KeyboardType | undefined;
    handler: (text: string) => void;
};

export const SingleLineText = ({value, isDisabled, handler,  keyboardType }: ISingleLineTextInput): JSX.Element => {

    function getKeyboardType() {
        if (keyboardType === undefined) {
            return 'default';
        } else return keyboardType;
    };

    return (
        <View>
            <Input
                keyboardType={getKeyboardType()}
                isDisabled={isDisabled}
                multiline={false}
                value={value}
                onChangeText={(text) => handler(text)}
            />
        </View>
    )
};