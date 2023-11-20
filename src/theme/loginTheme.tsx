import { StyleSheet } from "react-native";


export const loginStyles = StyleSheet.create({
    form:{
        backgroundColor: 'white',
        width: '30%',
        top: '15%',
        paddingTop: 50,
        paddingBottom: 50,
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 7
    },
    title: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20
    },
    label: {
        marginTop: 25,
        color: 'black',
        fontWeight: 'bold'
    },
    inputField: {
        color: 'black',
        fontSize: 20
    },
    inputFieldIOS: {
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        paddingBottom: 4
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 50
    },
    button: {
        width: 150,
        borderWidth: 2,
        borderColor: '#c89551',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: '#c89551',
        alignItems: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    }

});