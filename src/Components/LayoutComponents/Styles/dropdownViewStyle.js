import { StyleSheet } from "react-native";
import styled from 'styled-components/native';

export const DropdownViewStyle = StyleSheet.create({
    boxView: {
        backgroundColor: 'blue',
        height: 30,
        marginTop: 10
    },

    view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    },

    text: {
        color: 'white'
    }
});

export const DropdownMenuStyle = styled.View`
    height: 35;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    padding: 10px;
    background-color: #0575bd;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    border-bottom-right-radius: ${props => props.checked ? "0" : "4px"};
    border-bottom-left-radius: ${props => props.checked ? "0" : "4px"};
`;

export const ViewStyle = styled.View`
    margin-bottom: 5px;
    border-width: 1px;
    border-color: #0575bd;
    padding: 5px;
    display: ${props => props.displayView};
`;
