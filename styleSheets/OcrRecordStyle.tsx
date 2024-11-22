import { Platform, StyleSheet } from "react-native";
const styles = StyleSheet.create( {
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    gap:10,
    alignItems: 'center',
  },
  headerSubcontainer:{
    flexDirection:'row',

  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  editbtncontainer:{
    marginLeft:'70%',
    width: 40,
    height: 20,
    borderRadius: 18,
    borderWidth:0.5,
    borderColor:'black',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',

  },
  editButton: {
    fontSize: 12,
    color: 'black',
  },
  caseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  emptyContainer:{
    justifyContent:'center',
    alignContent:"center",

  },
  emptyText:{
    color:'#202124',
  },
  scanItemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    
    borderBottomColor: '#E0E0E0',
  },
  scanItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    marginStart:-10,
    padding: 4,
    height:25,
    width:60,
    borderWidth:1,
    borderRadius: 8,
    borderColor:'#72BF78',
  },
  statusText: {
    color: '#202124',
    fontSize: 10,
    textAlign:'center',
    fontWeight: 'regular',
  },
  scanDetails: {
    flex: 1,
    gap:2,
    marginLeft: 10,
  },
  scanTitle: {
    fontSize: 16,
    fontWeight: 'regular',
  },
  scanDateTime: {
    fontSize: 12,
    color: '#888',
  },
  imageCount: {
    fontSize: 12,
    color: '#888',
  },
  arrowIcon: {
    backgroundColor:'#202124',
    borderRadius:20,
    borderWidth:1,
    borderColor:'#202124',
    marginLeft: 0,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 56,
    height: 62,
    borderRadius: 18,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;