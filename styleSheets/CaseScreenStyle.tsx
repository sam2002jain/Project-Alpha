import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#FFF',
    },
    Mainheader:{
  
      flexDirection:'row',
  
    },
    header: {
      fontSize: 18,
      left:12,
      fontWeight: '400',
      marginBottom: 16,
      color:'#121212',
    },
    section: {
      top:12,
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 12,
      color:'#121212',
    },
    card: {
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#EEF2FF',
      borderRadius: 10,
      width:150,
      height:100,
      justifyContent:'center',
      
      padding: 16,
    },
    iconPlaceholder: {
      width: 24,
      height: 24,
      right:8,
      borderRadius: 12,
      justifyContent:'center',
    },
    cardText: {
      top:10,
      fontSize: 16,
      fontWeight: '500',
      color:'black',
      alignContent:'center',
      justifyContent:'center',
    },
  });

  export default styles;