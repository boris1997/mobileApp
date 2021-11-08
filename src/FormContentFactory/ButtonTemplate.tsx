import { View, Button } from 'react-native';
import React from 'react';

const ButtonTemplate = (title: string/*, onpress?: Function*/) => {
    return (
        <View>
            <Button title={title} onPress={() => { console.log("press") }} />
        </View>
    )
}

export default ButtonTemplate