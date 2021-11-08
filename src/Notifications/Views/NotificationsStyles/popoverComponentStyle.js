import { StyleSheet } from "react-native";
import styled from "styled-components/native";

export const PopoverComponentStyle = StyleSheet.create({
    badge: {
        marginLeft: -12, 
        marginTop: -12, 
        borderRadius: 10, 
        backgroundColor: "red"
    },
    
    content: {
        width: 305,
    },

    arrow: {
        backgroundColor: "transparent", 
        borderColor: "transparent"
    },

    scroll: {
        height: "95%"
    },

    boxView: {
        flexDirection: 'row', 
        justifyContent: "space-between", 
        alignItems: "center"
    }
});