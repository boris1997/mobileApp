import { StyleSheet } from "react-native";
import styled from "styled-components/native";

export const MarkdownStyle = StyleSheet.create({
    boxView: {
        flex: 2, 
        marginTop: 20
    },

    text: {
        flex: 1
    }
});

export const ViewStyle = styled.View`
    flex: 1;
    display: ${props => props.previewState};
`;