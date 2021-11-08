import React from 'react';
import { Text, View } from 'react-native';
import Button from './Button';
import { ICreatable } from './Creatable';
import { Duration } from '../Components/InputFields/Duration/Duration';
import { Format } from '../Components/InputFields/Duration/DurationFormats';
import { AccessType } from '../Components/InputFields/Duration/DurationTemplate';
import { FilePicker } from '../Components/InputFields/Document/FilePicker';
import { Camera } from '../Components/Camera/Camera';
import { Chat } from '../Components/Chat/Chat';
export const formComponentTypes = {
    // verticalLayout: 'v-container',
    // horizontalLayout: 'h-container',
    // tabs: 'tabs',
    // group: 'group',
    // popup: 'popup',
    button: 'button',
    // grid: 'grid',
    // toolbar: 'toolbar',
    // plainText: 'plainText',
    custom: 'custom'
};




export default class FormContentFactory {

    public getContentFromSchema(schema: Array<any>) {
        return this.parseConfiguration(schema)[0];
    }

    private parseConfiguration(schema: Array<any>) {
        return schema.map(this.parseChildConfiguration)
    }

    private parseChildConfiguration(child: any) {
        const { type, ...options } = child; // убираем type из options 

        switch (child.type) {
            case formComponentTypes.button:
                return new Button({ ...options }).create();
            case formComponentTypes.custom:
                return (new Duration({ ...options }).create())
            default:
                return <View></View>
        }
    }
}