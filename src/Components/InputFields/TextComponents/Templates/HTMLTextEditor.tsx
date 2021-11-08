import React from 'react';
import { StyleSheet, View } from 'react-native';
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';
import { HTMLTextEditorStyles } from './TemplateStyles/HTMLTextEditorStyles';

export function HTMLTextEditor() {
    const _editor = React.createRef();

    return (
        <>
            <View style={HTMLTextEditorStyles.mainView}>
                <QuillEditor
                    style={HTMLTextEditorStyles.editor}
                    ref={_editor}
                    initialHtml="<h1>Header</h1>"
                />
                <QuillToolbar editor={_editor} options="full" theme="light" />
            </View>
        </>
    );
};