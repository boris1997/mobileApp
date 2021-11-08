import { StyleSheet } from "react-native";
import styled from "styled-components/native";

export const MessageItemViewStyle = StyleSheet.create({
    divider: {
        backgroundColor: "blue",
        width: 2,
        marginTop: 4,
        marginLeft: 2,
        marginRight: 2,
        height: "auto",
    },

    boxView: {
        flexDirection: "row",
    },

    view: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    view1: {
        flexDirection: 'row',
        justifyContent: 'center'
    },

    iconFirst: {
        color: '#808080'
    },

    iconSecond: {
        color: 'green'
    }
});

export const PressableButton = styled.Pressable`
    border-width: 1px;
    border-color: #DCDCDC;
    border-style: solid;
    border-radius: 4px;
    margin: 5px;
    background-color: ${props => props.isArchived ? '#524f4f' : 'white'};
`;

export const TextStyle = styled.Text`
    background-color: ${props => props.color};
`;


// style={{ backgroundColor: message.creator.color }}