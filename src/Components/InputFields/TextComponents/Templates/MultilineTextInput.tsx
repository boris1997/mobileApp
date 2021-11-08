import React, { FC, useState } from 'react';
import { Input } from "native-base"

export const MultilineTextInput = () => {
    const [changeText, setChangeText] = useState<string>('');    return (
        <>
            <Input
                multiline={true}
                value={changeText}
                onChangeText={(text) => setChangeText(text)}
                numberOfLines={3}
            />
        </>
    )
};

