import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexGrow: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 20,
    },
    paragraph: {
      marginBottom: 20,
      textAlign: 'center',
    },
    button: {
      backgroundColor: '#007bff',
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginBottom: 10,
      borderRadius: 8
    },
    disabledButton: {
        backgroundColor: '#787878',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
        borderRadius: 8
    },
    logoutButton: {
      backgroundColor: '#ff0700',
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginBottom: 10,
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
      backgroundColor: '#00cc00',
      width: '100%',
      color: '#fff',
      textAlign: 'center',
      paddingVertical: 15
    },
    input: {
      height: 40,
      width: 250,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
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
        backgroundColor: '#2196F3',
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
        padding: 8
    },
    formContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 500,
        maxWidth: '100%',
        padding: 20,
    },
    pickerItem: {
        width: 250,
        maxWidth: '100%',
    },
});

  export default styles;
