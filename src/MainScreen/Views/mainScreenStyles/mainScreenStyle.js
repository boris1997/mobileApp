import { StyleSheet } from "react-native";

export const mainScreenStyle = StyleSheet.create({
    badge: {
        borderRadius: 15, 
        backgroundColor: "red", 
        marginLeft: -12, 
        marginTop: -12
    },
    
    boxView: {
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        marginRight: 10
    },

    button: {
        height: 40, 
        width: 120
    }
});