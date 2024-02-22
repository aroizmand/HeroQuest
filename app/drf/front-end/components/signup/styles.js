import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollViewContent: {
      flexGrow: 1,
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100%',
      padding:20 
    },
    headerContainer: {
      marginBottom: 20,
    },
    title: {
      fontSize: 30,
      textAlign: 'center',
      color: '#ffffff',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      color: '#868E96', 
      textAlign: 'center',
      marginBottom: 20,
    },
    input: {
      width: '80%',
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderRadius: 20,
      color: '#ffffff',
      paddingHorizontal: 15,
      paddingVertical: 10,
      fontSize: 16,
      marginBottom: 15,
    },
    button: {
      backgroundColor: '#ffffff',
      padding: 15,
      width: 150,
      borderRadius: 20,
      alignItems: 'center',
      marginBottom: 20,
      marginTop:10,
    },
    buttonText: {
      color: '#000000',
      fontWeight: 'bold',
    },
    signupContainer:{
      flexDirection:"row",
      marginTop: 15,
    },
    buttonTextOutline: {
      color: '#ffffff',
    },
    buttonTextOutlineSignup:{
      color: 'cyan',
    }
  });

  export default styles;