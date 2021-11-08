import { StyleSheet } from "react-native";

export const DocStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    videoContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    img: {
        width: 100,
        height: 100,
        alignSelf:"center"
    },
    video: {
        alignSelf: 'center',
        width: 320,
        height: 200,
    },
    fileView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    iconButton: {
        alignSelf: 'flex-end',
    }
});