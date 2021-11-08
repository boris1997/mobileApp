import { StyleSheet } from "react-native";

export const ConversationViewStyle = StyleSheet.create({
    boxView: {
        flexDirection: 'column', 
        flex: 6
    },

    view: {
        justifyContent: 'flex-end', 
        marginBottom: 5
    },

    input: {
        borderColor: "black"
    },

    buttonSend: {
        margin: 5
    },

    icon: {
        color: "black"
    },

    button: {
        width: 30,
        height: 30,
    }
});