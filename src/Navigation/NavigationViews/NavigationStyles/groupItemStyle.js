import styled from "styled-components/native";

export const TextStyle = styled.Text`
    color: ${props => props.checked ? "red" : "black"};
    flex: 1;
    font-size: 16px;
`;

