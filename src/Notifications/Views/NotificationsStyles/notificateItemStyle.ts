import { StyleSheet } from "react-native";
//@ts-ignore
import styled from "styled-components/native";

export const NotificateItemStyle = (pressable?: boolean) =>
  StyleSheet.create({
    boxView: {
      alignItems: "center",
    },

    view: {
      flexDirection: "row",
    },

    icon: {
      alignSelf: "flex-start",
    },

    text: {
      textAlign: "center",
      backgroundColor: pressable ? "dodgerblue" : 'transparent',
    },
  });

export const ViewStyle = styled.View`
  align-items: center;
  background-color: ${(props: { isRead: boolean }) =>
    props.isRead ? "white" : "#e8f6ff"};
`;
