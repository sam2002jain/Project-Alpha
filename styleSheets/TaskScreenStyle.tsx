import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'semibold',
      color:'#121212',
      marginLeft: 16,
      marginTop: 16,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      gap:16,
      
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0',
    },
    iconContainer: {
      backgroundColor: '#D7C3F1',
      borderRadius: 30,
      padding: 8,
      marginRight:4,
    },
    textContainer: {
      flex: 1,
    },
    itemTitle: {
      fontSize: 18,
      fontWeight: '400',
      color:'black',
    },
    itemDate: {
      fontSize: 14,
      fontWeight: '400',
      color: '#6D6D6D',
    },
    fab: {
      position: 'absolute',
      right: 20,
      bottom: 20,
      backgroundColor: '#000',
      borderRadius: 16,
      padding: 16,
      elevation: 3,
    },
    
  });
  export default styles;