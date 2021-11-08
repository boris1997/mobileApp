import { StyleSheet } from "react-native";
import styled from "styled-components/native";

export const WorkspaceItemStyle = StyleSheet.create({
    iconArrow: {
        color: "white",
    }
})

export const TextStyle = styled.Text`
    color: ${props => props.checked ? "red" : "white"};
    flex: 1;
    font-size: 16px;
`;

export const ViewBox = styled.View`
        height: 35px;
        flex-direction: row;
        align-items: center;
        margin-top: 10px;
        padding: 10px;
        background-color: #0575bd;
        border-top-right-radius: 4px;
        border-top-left-radius: 4px;
        border-bottom-right-radius: ${props => props.checked ? "0" : "4px"};
        border-bottom-left-radius: ${props => props.checked ? "0" : "4px"};
`;

