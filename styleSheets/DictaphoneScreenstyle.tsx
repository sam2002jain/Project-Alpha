import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    Mainheader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginStart: 10,
      padding: 10,
      marginTop: 0,
      gap: 1,
      justifyContent: 'flex-start',
      },

      header: {
        fontSize: 18,
        left: 12,
        fontWeight: '400',
        marginTop:0,
        color: '#121212',
      },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color:'#202124',
      padding: 20,
    },
    headingContainer: {
      flexDirection: 'row',
      marginVertical: 0,
      justifyContent: 'space-between', 
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end', 
      alignItems: 'center',
      marginRight: 20, 
    },
    editButton: {
      alignContent:'center',
      justifyContent:'center',
      borderRadius: 14,
      borderColor: 'black',
      top:20,
      width: 42,
      borderWidth: 0.5,
      height: 25,
      backgroundColor: 'white',
      marginRight: 10, 
    },
    
    editText: {
      color: 'black',
      fontSize: 10,
      top: 0,
      textAlign: 'center',
    },
    cancelbutton: {
      alignContent:'center',
      justifyContent:'center',
      borderRadius: 14,
      borderColor: 'black',
      top: 20,
      marginRight: 10,
      width: 45,
      borderWidth: 0.5,
      height: 25,
      backgroundColor: 'white',
    },

    
    itemContainer: {
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    itemHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    textContainer: {
      flex: 1,
      marginLeft: 10,
      top: 0,
    },
    dateTime: {
      top: -10,
      fontSize: 14,
      color: '#202124',
    },
    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap:10,
      
    },
    statussubContainer:{
      flexDirection:'row',
      gap:90,

    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      fontSize: 18,
      color: '#202124',
      fontWeight:'600',
    },
    emptySubText:{
      fontSize:14,
      textAlign:'center',
      color:'grey',
      fontWeight:'400',

    },
    
    duration: {
      fontSize: 14,
      color: '#555',
      marginRight: 8,
    },
    statusText: {
        fontSize: 12,
        color: '#555',
        fontWeight: '500',
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 5,
        borderWidth: 1, // Set the border width
      },
    errorMessage: {
      fontSize: 14,
      color: '#E14942',
      marginTop: 10,
    },
    shareIcon:{
            
      width: 30,
      height: 30,
      borderRadius: 20,
      position: 'absolute',
      right: 10,  
      

    },
    floatingButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: '#000',
      width: 65,
      height: 65,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectAllContainer:{
      flexDirection:'row',
      padding: 10,

    },
    selectAllButton:{
      width: 20,
      height: 20,
      borderColor: '#000',
      borderWidth: 2,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
      marginStart: 15, 
      marginTop:20,
      backgroundColor: '#fff', 
      },
    
    
    checkbox: {
      width: 20,
      height: 20,
      borderColor: '#000',
      borderWidth: 2,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10, 
      backgroundColor: '#fff', 
    },
    checkboxSelected: {
      backgroundColor: 'black', 
    },
    tickmark:{


    },
   
    
    
    deleteButton:{
      position: 'absolute',
      bottom:20,
      gap:5,
      marginStart:'40%',
      backgroundColor: '#000',
      width: 85,
      flexDirection:'row',
      height: 48,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    deleteText:{
      color:'#FFFFFF',
      textAlign:'center',

    },
  });
  export default styles;