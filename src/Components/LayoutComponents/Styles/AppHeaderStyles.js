import { StyleSheet } from "react-native";
import styled from 'styled-components/native';

export const AppHeaderStyles = StyleSheet.create({
    areaView: {
        backgroundColor: "#1E90FF"
    }
});

export const HeaderView = styled.View`
    background-color: #0575bd;
    flex-direction: row;
    justify-content: space-between;
`;

export const RightButtonContainet = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    align-self: center;
`;

export const SectionName = styled.Text`
    font-size: 20px;
    color: white;
    align-self: center;
    font-weight: 800; 
`;