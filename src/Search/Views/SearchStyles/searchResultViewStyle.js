import { StyleSheet } from "react-native";

export const SearchResultViewStyles = StyleSheet.create({
    text: {
        backgroundColor: 'blue', 
        color: 'white'
    },
    
    boxView: {
        padding: 5, 
        marginTop: 5, 
        flexDirection: 'column', 
        borderStyle: 'solid', 
        borderWidth: 1, 
        borderRadius: 4
    },

    boxText: {
        flexDirection: 'row', 
        justifyContent: 'space-between'
    }
});