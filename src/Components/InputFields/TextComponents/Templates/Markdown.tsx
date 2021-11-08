import React, { useState, FC } from 'react';
import { View, TextInput } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { Switch } from "native-base"
import { MarkdownStyle, ViewStyle } from './TemplateStyles/markdownStyle';

export const MarkdownComponent = () => {
  const [changeText, setChangeText] = useState<string>('');
  const [previewState, setPreviewState] = useState<string>('none')

  const MarkedTextPreview = () => {
    return (
      //@ts-ignore
      <ViewStyle previewState ={previewState}>
        <Markdown>
          {changeText}
        </Markdown>
      </ViewStyle>
    )
  };

  return (
    <View style={MarkdownStyle.boxView}>
      <Switch
        onToggle={() => setPreviewState(previewState === 'flex' ? 'none' : 'flex')}
        defaultIsChecked={false}
      />
      <TextInput
        keyboardType='default'
        multiline={true}
        blurOnSubmit={true}
        onChangeText={setChangeText}
        value={changeText}
        placeholder='Write here'
        returnKeyType={'default'}
        style={MarkdownStyle.text}
      />
      <MarkedTextPreview />
    </View>
  );
};