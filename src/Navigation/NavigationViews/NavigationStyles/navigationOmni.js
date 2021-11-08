import { StyleSheet } from "react-native";
import styled from "styled-components/native";

export const NavigationOmni = StyleSheet.create({
    iconMain: {
        width: 15,
        height: 15,
        marginRight: 10
    },

    boxField: {
        height: 45,
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: 10,
    }
});

export const ViewArrow = styled.View`
        margin-left: auto;
        transform: rotate(0deg);
        transform: ${props => (props.checked ? `rotate(180deg)` : "")};
`;