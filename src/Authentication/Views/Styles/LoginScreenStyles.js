import { StyleSheet } from "react-native";
import styled from "styled-components/native";

export const LoginScreenStyles = StyleSheet.create({
  mainPage: {
    height: "100%",
    paddingTop: 70,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "white",
  },

  inputBox: {
    height: 40,
  },

  inputField: {
    height: 40,
    borderRadius: 4,
    fontSize: 16,
    paddingLeft: 10,
  },

  imageField: {
    alignSelf: "center",
    marginBottom: 40,
  },

  protBox: {
    height: 45,
  },

  selectField: {
    paddingLeft: 10,
  },

  alertField: {
    height: 50,
    marginBottom: 100,
  }
});

export const TextStyle = styled.Text`
  font-size: 16px;
  margin: 10px;
  color: white;
`;

export const FieldText = styled.Text`
  font-size: 16px;
  margin: 10px 10px 5px;
  color: black;
`;

export const LoginButton = styled.TouchableOpacity`
  height: 45px;
  width: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #0575bd;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;