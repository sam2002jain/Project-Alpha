import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import DeleteIcon from '../assets/deleteIcon.svg'; 
import { StyleSheet } from 'react-native';


interface DeleteConfirmationModalProps {
  visible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  selectedCount: number;
}
enum placeholder{
  message=  'This recording has already been added to the document. Deleting it will only remove the recording from the dictaphone. Are you sure you want to delete this recording?',
}
const DeleteModalComponent: React.FC<DeleteConfirmationModalProps> = ({
  visible,
  message,
  onConfirm,
  onCancel,
  selectedCount,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Delete Recording?</Text>
          <Text style={styles.modalMessage}>{placeholder.message}</Text>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={styles.modalCancelButton} onPress={onCancel}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalDeleteButton} onPress={onConfirm}>
              <DeleteIcon width={20} height={20} />
              <Text style={styles.modalDeleteText}>Delete ({selectedCount})</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
      },
      modalContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
      },
      modalTitle: {
        
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 10,
        color:'#202124',
      },
      modalMessage: {
        
        fontSize:14,
        textAlign: 'left',
        fontWeight:'400',
        marginBottom: 20,
        color:'#5F6368',
      },
      modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
      },
      modalCancelButton: {
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderRadius: 5,
        backgroundColor: 'white',
        marginRight: 10,
      },
      modalCancelText: {
        fontSize: 14,
        color: 'black',
      },
      modalDeleteButton: {
        gap:5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 15,
        backgroundColor: '#202124', // Red color for delete button
      },
      modalDeleteText: {
        fontSize: 14,
        color: 'white',
        marginLeft: 8, // Space between icon and text
      },
});


export default DeleteModalComponent;
