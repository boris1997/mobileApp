import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { FormControl } from "native-base"
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { DatePickerStyle } from './DatePickerStyle';

const DateFormatPatterns = {
    ShortDate: "M/D/YYYY",
    DateISO: "YYYY-M-D",
    CondensedDate: "MMM. D, YYYY",
    LongDate: "dddd, MMMM D, YYYY",
    MonthDay: "MMMM D",
    YearMonth: "MMMM, YYYY",
    LongDateShortTime: "dddd, MMMM D, YYYY h:mm A",
    LongDateLongTime: "dddd, MMMM D, YYYY h:mm:ss A",
    ShortDateShortTime: "M/D/YYYY h:mm A",
    ShortDateLongTime: "M/D/YYYY h:mm:ss A",
    CondensedDateTime: "MMMM D, YYYY h:mm A",
    ShortTime: "HH:mm",
    LongTime: "HH:mm:ss",
};

const DateFormatTypes = {
    ShortDate: "ShortDate",
    DateISO: "DateISO",
    CondensedDate: "CondensedDate",
    LongDate: "LongDate",
    MonthDay: "MonthDay",
    YearMonth: "YearMonth",
    LongDateShortTime: "LongDateShortTime",
    LongDateLongTime: "LongDateLongTime",
    ShortDateShortTime: "ShortDateShortTime",
    ShortDateLongTime: "ShortDateLongTime",
    CondensedDateTime: "CondensedDateTime",
    ShortTime: "ShortTime",
    LongTime: "LongTime",
};

export const DatePickerComponent = (format: string, acces: string) => {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChangeDate = (event: any, selectedDate: Date) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    const onShow = (showMode: boolean) => {
        showMode = show;
        setShow(showMode === false ? true : false)
    };

    function setDateFormat() {
        format = DateFormatTypes.CondensedDateTime
        switch (format) {
            case DateFormatTypes.ShortDate: {
                return moment(date).format(DateFormatPatterns.ShortDate);
            };
            case DateFormatTypes.DateISO: {
                return moment(date).format(DateFormatPatterns.DateISO);
            };
            case DateFormatTypes.CondensedDate: {
                return moment(date).format(DateFormatPatterns.CondensedDate)
            };
            case DateFormatTypes.LongDate: {
                return moment(date).format(DateFormatPatterns.LongDate)
            };
            case DateFormatTypes.MonthDay: {
                return moment(date).format(DateFormatPatterns.MonthDay)
            };
            case DateFormatTypes.YearMonth: {
                return moment(date).format(DateFormatPatterns.YearMonth)
            };
            case DateFormatTypes.LongDateShortTime: {
                return moment(date).format(DateFormatPatterns.LongDateShortTime)
            };
            case DateFormatTypes.LongDateLongTime: {
                return moment(date).format(DateFormatPatterns.LongDateLongTime)
            };
            case DateFormatTypes.ShortDateShortTime: {
                return moment(date).format(DateFormatPatterns.ShortDateShortTime)
            };
            case DateFormatTypes.ShortDateLongTime: {
                return moment(date).format(DateFormatPatterns.ShortDateLongTime)
            };
            case DateFormatTypes.CondensedDateTime: {
                return moment(date).format(DateFormatPatterns.CondensedDateTime)
            };
            case DateFormatTypes.ShortTime: {
                return moment(date).format(DateFormatPatterns.ShortTime)
            };
            case DateFormatTypes.LongTime: {
                return moment(date).format(DateFormatPatterns.LongTime)
            };
            default: {
                return moment(date).format()

            };
        };
    };

    function isDisabled() {
        switch (acces) {
            case 'disabled': {
                return true
            };
            default: {
                return false
            };
        };
    };

    function isReadonly() {
        switch (acces) {
            case 'readonly': {
                return true
            };
            default: {
                return false
            };
        };
    };

    function isRequired() {
        switch (acces) {
            case 'required': {
                return true
            };
            default: {
                return false
            };
        };
    };

    return (
        <FormControl
            isDisabled={isDisabled()}
            isReadOnly={isReadonly()}
            isRequired={isRequired()}
        >
            <View>
                <View style={DatePickerStyle.boxView}>
                    <Text onPress={onShow}>{setDateFormat()}</Text>
                </View>
                {show && (
                    <DateTimePicker
                        value={date}
                        mode='date'
                        display="default"
                        onChange={onChangeDate}
                    />
                )}
            </View>
        </FormControl>
    );
};