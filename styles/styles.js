/*
    Author: Xander Renkema, Gregory Smith
    Date: May 6, 2024
    Description: Styling for the app
*/

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexGrow: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      margin: 0,
      padding: 20,
    },
    paragraph: {
      marginBottom: 20,
      textAlign: 'left',
      width: 500,
      maxWidth: '100%'
    },
    button: {
      backgroundColor: '#007bff',
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginTop: 10,
      borderRadius: 8
    },
    disabledButton: {
        backgroundColor: '#787878',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
        borderRadius: 8
    },
    redButton: {
      backgroundColor: '#bb0700',
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginTop: 20,
      borderRadius: 8
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      backgroundColor: '#006600',
      width: '100%',
      color: '#fff',
      textAlign: 'center',
      paddingVertical: 15,
      borderRadius: 8
    },
    header2: {
      fontSize: 18,
      fontWeight: 'bold',
      backgroundColor: 'darkorange',
      padding: 10,
      marginVertical: 10,
      borderRadius: 8,
      color: '#444444',
    },
    body: {
      padding: 10,
      marginVertical: 5,
      fontWeight: 'bold',
      backgroundColor: 'gray',
      borderRadius: 8,
      color: 'white'
    },
    input: {
      height: 40,
      width: 265,
      maxWidth: '100%',
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
      backgroundColor: 'white'
    }, disabledInput: {
      height: 40,
      width: 265,
      maxWidth: '100%',
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
      backgroundColor: 'gray'
    },
    label: {
      marginLeft: 8
    },
    errorText: {
      marginBottom: 20,
      textAlign: 'center',
      color: 'red'
    },
    successText: {
        marginBottom: 20,
        textAlign: 'center',
        color: 'green'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    buttonClose: {
      marginTop: 20
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonGroup: {
        flexDirection: 'row',
        marginTop: 20,
    },
    buttonContainer: {
        alignSelf: 'flex-start', // Make each button container span with the width of its content
        marginHorizontal: 10, // Add margin between elements
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 8,
        padding: 8,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        padding: 20,
        backgroundColor: 'lightgray',
        borderRadius: 8
    },
    pickerItem: {
        width: 250,
        maxWidth: '100%',
        margin: 8,
        padding: 8,
        borderWidth: 1,
        height: 40,
        backgroundColor: 'white'
    },
    disabledPickerItem: {
      width: 250,
      maxWidth: '100%',
      margin: 8,
      padding: 8,
      borderWidth: 1,
      height: 40,
      backgroundColor: 'gray'
  }
    
});

  export default styles;
