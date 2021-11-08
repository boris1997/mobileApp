import React, { useState, FC } from "react";
import { StyleSheet, Text } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import { setMask, validateTime } from "./DurationFormats"
import { Format } from './DurationFormats'
import { mask } from "react-native-mask-text";
import {
  FormControl,
  Stack,
  Center,
} from "native-base"
import { onEndValidation } from './DurationFormats'
import { DurationStyles } from "./DurationStyles";

export interface IDuration {
  format: string;
  accessType: string;
  readOnlyValue?: string;
};

export const DurationTemplate: FC<IDuration> = ({ format, accessType, readOnlyValue }): JSX.Element => {

  const [rawText, setRawText] = useState<string>();
  const [text, setText] = useState<string>();
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const textMask: string = setMask(format);

  const renderFiled = () => {
    return (
      <Stack mx={4}>
        <FormControl.Label>{format}</FormControl.Label>
        <MaskedTextInput
          mask={textMask}
          onChangeText={(text: string, rawText: string) => {
            setRawText(rawText);
            setText(text);
            setIsInvalid(onEndValidation(format, text));
          }}
          value={format == Format.DurationISO ? validateTime(rawText!, text!, format).toUpperCase() : validateTime(rawText!, text!, format)}
          placeholder={textMask.toUpperCase()}
          style={DurationStyles.input}
          keyboardType={"number-pad"}
        />
        <FormControl.ErrorMessage>Something is wrong.</FormControl.ErrorMessage>
      </Stack>
    );
  };

  switch (accessType) {
    case AccessType.Editable:
      return (
        <Center flex={1}>
          <FormControl isRequired={false} isInvalid={!isInvalid}>
            {renderFiled()}
          </FormControl>
        </Center>
      );
    case AccessType.Readonly:
      readOnlyValue = mask(readOnlyValue!, textMask);
      return (
        <Text style={DurationStyles.readonly}> {readOnlyValue} </Text>
      );
    case AccessType.Required:
      return (
        <Center flex={1}>
          <FormControl isRequired={true} isInvalid={!isInvalid}>
            {renderFiled()}
          </FormControl>
        </Center>
      );
    default: return (<Text>Undefined access type</Text>)
  };
};

export enum AccessType {
  Readonly = "Readonly",
  Editable = "Editable",
  Required = "Required",
}

export default DurationTemplate;



