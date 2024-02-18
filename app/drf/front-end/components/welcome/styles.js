import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    headerContainer: {
      marginVertical: 50,
    },
    title: {
      fontSize: 24,
      textAlign: 'center',
      marginBottom: 20,
    },
    subtitle: {
      fontSize: 15,
      color: '#868E96', 
      textAlign: 'center',
      marginBottom: 18,
    },
    button: {
      backgroundColor: '#ffffff',
      padding: 15,
      width:200,
      borderRadius: 20,
      alignItems: 'center',
      marginBottom: 20,
    },
    buttonText: {
      color: '#000000',
      fontWeight: 'bold',
    },
    buttonOutline: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: '#ffffff',
      paddingVertical: 13, 
      paddingHorizontal: 15, 
      width:200,
      borderRadius: 20,
      alignItems: 'center',
      marginBottom: 10,
    },
    buttonTextOutline: {
      color: '#ffffff',
    },
  });
  
  export default styles;
  