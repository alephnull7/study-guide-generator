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
      width: '100%',
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
    },
    label: {
      marginLeft: 8
    }
  });

  export default styles;
