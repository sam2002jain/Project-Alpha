import { Alert, Button, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import CrossIcon from '../assets/cross.svg';

interface NewCaseComponentProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  caseName: string;
  setCaseName: (name: string) => void;
  caseDate: string;
  setCaseDate: (date: string) => void;
  handleSubmit: () => void;
}

const NewCaseComponent: React.FC<NewCaseComponentProps> = ({
  modalVisible,
  setModalVisible,
  caseName,
  setCaseName,
  caseDate,
  setCaseDate,
  handleSubmit
}) => {

    const validateAndSubmit = () => {
        if (!caseName.trim() || !caseDate.trim()) {
          Alert.alert('Error', 'Please fill in both the case name and date');
          return;
        }
        handleSubmit(); // Call the provided handleSubmit function if inputs are valid
      };
    
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
          <TouchableOpacity 
              style={styles.closeIcon}
              onPress={() => setModalVisible(false)}
            >
              <CrossIcon height={25} width={25} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add New Case</Text>
           
            <View style={styles.inputContainer}>
            <Text style={styles.CaseNameText}>Case Name</Text>
            <TextInput
              placeholder='X v/s Y'
              value={caseName}
              onChangeText={setCaseName}
              style={styles.input}
            />
            <Text style={styles.CaseDateText}>Case Date</Text>
            <TextInput
              placeholder='DD/MM/YYYY'
              value={caseDate}
              onChangeText={setCaseDate}
              style={styles.input}
            />
            </View>

            <TouchableOpacity style={styles.button} onPress={validateAndSubmit}>
                <Text style={styles.AddCaseText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NewCaseComponent;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: '#ffff',
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    color:'#202124',
    fontWeight: 'bold',
  },
  inputContainer:{
    flexDirection:'column',

  },
  CaseNameText:{
    fontSize:16,
    color:'#212024',
    

  },
  CaseDateText:{
    fontSize:16,
    color:'#212024',

  },
  input: {
    width: 200,
    borderWidth: 1,
   borderColor:'#ffff',
    backgroundColor:'#D7CFFF',
    borderRadius: 8,
    

    padding: 15,
    marginVertical: 10,
  },
  button:{
    height:40,
    width:90,
    marginTop:15,
    borderColor:'#202124',
    borderRadius:8,
    backgroundColor:'#202124',
    justifyContent:'center',

  },
  AddCaseText:{
    color:'#ffff',
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center',
    

  },
  closeText:{
    color:'#ffff',
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center',

  }
});
