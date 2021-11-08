import { StyleSheet } from "react-native";

export const HTMLTextEditorStyles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingVertical: 10,
    },
    editor: {
        flex: 1,
        padding: 0,
        borderColor: 'gray',
        borderWidth: 1,
        marginHorizontal: 30,
        marginVertical: 5,
        backgroundColor: 'white',
    },
    mainView: {
        height: 600,
        width: 'auto'
    }
});