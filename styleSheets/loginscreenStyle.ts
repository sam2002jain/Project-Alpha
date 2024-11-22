import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    // styles remain unchanged
    container: {
      flex: 1,
      backgroundColor: '#f9f9f9',
    },
    contentContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      fontSize: 28,
      color: '#202124',
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'left',
    },
    placeholder: {
      fontSize: 16,
      color: '#5f6368',
      fontWeight: '600',
      marginBottom: 30,
      textAlign: 'left',
    },
    formContainer: {
      flex: 1,
    },
    inputField: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: '400',
      color: '#202124',
      marginBottom: 5,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#D8D8D8',
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: '#FFFFFF',
    },
    input: {
      flex: 1,
      fontSize: 16,
      fontWeight: '400',
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderRadius: 8,
      color:'#202124',
    },
    eyeIconContainer:{
      height:40,
      justifyContent:'center',
      paddingHorizontal:8,
      borderRadius:8,
      backgroundColor:'#f0f0f0',

    },
    eyeIcon: {
      width:24,
      height:24,
    },
    loginButton: {
      backgroundColor: '#121212',
      alignSelf: 'center',
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      marginTop: 20,
      paddingVertical: 15,
    },
    loginButtonText: {
      color: 'white',
      fontSize: 18,
    },
    errorBorder: {
      borderColor: 'red',
    },
    errorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
    },
    errorText: {
      color: '#E14942',
      fontSize: 14,
    },
    warningIcon: {
      marginRight: 5,
    },
  });

  export default styles;