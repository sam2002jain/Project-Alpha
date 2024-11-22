import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ListRenderItem,Alert } from 'react-native';
import DoneIcon from '../assets/doneIcon.svg';
import ErrorIcon from '../assets/errorIcon.svg';
import Playbutton from '../assets/playbutton.svg';
import DeleteIcon from '../assets/deleteIcon.svg'; 
import Processing from '../assets/processingIcon.svg';
import MicIcon from '../assets/mic.svg';
import BackIcon from '../assets/back.svg';
import Tick from '../assets/tickmark.svg';
import ShareIcon from '../assets/share.svg';
import styles from '../styleSheets/DictaphoneScreenstyle';
import AudioPlayer from '../components/AudioPlayer';
import { getItem, setItem } from '../Storage/storage';
import { Toast } from 'toastify-react-native';
import DeleteModalComponent from '../components/DeleteModalComponent';
import { useCase } from '../components/caseContext';

interface RecordingItem {
  id: string;
  caseName: string;  
  dateTime: string;
  duration: string;
  status: string;
  statusColor: string;
  error: boolean;
  errorMessage?: string;
  audioKey?: string;
}

enum RecordingStatus {
  Error = 'Error',
  ProcessingAudio = 'Processing Audio',
  Ready = 'Ready',
}

enum StatusColor {
  Error = '#E14942',
  ProcessingAudio = '#FFCC00',
  Ready = '#4CAF50',
  Default = '#FFCC00',
}

interface CaseScreenProps {
  navigation: {
    goBack: () => void;
    navigate: (screen: string, params?: object) => void;
  };
  route: {
    params?: {
      uniqueKey?: string;
      duration?: string;
      status?: string;
    };
  };
}

const STORAGE_KEY = 'recordings';

const DictaphoneScreen: React.FC<CaseScreenProps> = ({ navigation }) => {
  const { selectedCase } = useCase();
  const [recordings, setRecordings] = useState<RecordingItem[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [checked, setChecked] = useState(false);  
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [allSelected, setAllSelected] = useState(false); 
  const [showDeleteModal, setShowDeleteModal] = useState(false); 



  useEffect(() => {
    const fetchRecordings = async () => {
      const caseRecordings = await getItem(`${STORAGE_KEY}_${selectedCase?.name}`);
      
      if (caseRecordings) {
        // Set the case recordings to state to display in the UI
        setRecordings(caseRecordings);
      }
    };
  
    fetchRecordings();
  }, [selectedCase]);

  const handleGoBack = (): void => {
    navigation.goBack();
  };

  const handleRecord = (): void => {
    navigation.navigate('RecorderScreen', {
      onRecordingComplete: async (uniqueKey: string, duration: string, status: RecordingStatus) => {
        let statusColor: string;
        switch (status) {
          case RecordingStatus.Error:
            statusColor = StatusColor.Error;
            break;
          case RecordingStatus.ProcessingAudio:
            statusColor = StatusColor.ProcessingAudio;
            break;
          case RecordingStatus.Ready:
            statusColor = StatusColor.Ready;
            break;
          default:
            statusColor = StatusColor.Default;
        }

        const caseKey = `${STORAGE_KEY}_${selectedCase?.name}`; 
        const existingRecordings = await getItem(caseKey);

        const newRecording: RecordingItem = {
          id: (existingRecordings?.length + 1 || 1).toString(),
          caseName: selectedCase?.name,
          dateTime: new Date().toLocaleString(),
          duration,
          status,
          statusColor,
          error: status === 'Error',
          audioKey: uniqueKey,
        };

        const updatedRecordings = [...(existingRecordings || []), newRecording];
        
        // Save recordings using the case-specific key
        await setItem(caseKey, updatedRecordings);
        setRecordings(updatedRecordings);
      },
    });
  };
  

  const handleEditToggle = () => {
    setEditMode(!editMode);
    setSelectedItems(new Set()); 
    setChecked(false); 
    setAllSelected(false);
  };

  const handleSelectItem = (id: string) => {
    const updatedSelection = new Set(selectedItems);
    if (updatedSelection.has(id)) {
      updatedSelection.delete(id);
    } else {
      updatedSelection.add(id);
    }
    setSelectedItems(updatedSelection);

    setChecked(updatedSelection.size > 0);
  };
  
  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedItems(new Set());
    } else {
      // Select all items
      const allIds = new Set(recordings.map(item => item.id));
      setSelectedItems(allIds);
    }
    setChecked(!allSelected);  
    setAllSelected(!allSelected); 
  };


  const handleDeleteSelected = () => {
    if (selectedItems.size === 0) {
      Toast.warn('No recordings selected');
      return;
    }
    setShowDeleteModal(true); // Show the delete confirmation modal
  };
  const confirmDelete = async () => {
    const updatedRecordings = recordings.filter(item => !selectedItems.has(item.id));
    setRecordings(updatedRecordings);
    await setItem(STORAGE_KEY, updatedRecordings);
    setSelectedItems(new Set());
    setChecked(false);
    setEditMode(false);
    setShowDeleteModal(false); 
    Toast.success('Recordings deleted');
  };

  const cancelDelete = () => {
    setShowDeleteModal(false); 
  };



  const getStatusBorderColor = (status: string): string => {
    switch (status) {
      case 'Error':
        return '#E14942';
      case 'Processing Audio':
        return '#FFCC00';
      case 'Ready':
        return '#4CAF50';
      default:
        return '#FFCC00';
    }
  };

  const renderItem: ListRenderItem<RecordingItem> = ({ item }) => {
    const playAudio = async (audioKey: string) => {
      const storedAudioPath = await getItem(audioKey);
      if (storedAudioPath) {
        return storedAudioPath;
      }
      return null;
    };
  
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemHeader}>
          {editMode ? (
            <TouchableOpacity
              style={[
                styles.checkbox,
                selectedItems.has(item.id) && styles.checkboxSelected
              ]}
              onPress={() => handleSelectItem(item.id)}
            >
              {selectedItems.has(item.id) ? <Tick /> : null}
            </TouchableOpacity>
          ) : (
            <Playbutton width={24} height={24} />
          )}
          <View style={styles.textContainer}>
            <Text style={styles.dateTime}>{item.dateTime}</Text>
            <View style={styles.statusContainer}>
              <Text style={styles.duration}>{item.duration}</Text>
              <View style={styles.statussubContainer}>
                <Text
                  style={[
                    styles.statusText,
                    {
                      backgroundColor: item.statusColor,
                      borderColor: getStatusBorderColor(item.status),
                    },
                  ]}
                >
                  {item.status}
                </Text>
                {/* Conditional rendering for icons based on status */}
                {item.status === RecordingStatus.Error && <ErrorIcon width={20} height={20} />}
                {item.status === RecordingStatus.ProcessingAudio && <Processing width={20} height={20} marginStart={-50}/>}
                {item.status === RecordingStatus.Ready && <DoneIcon width={20} height={20} />}
              </View>
            </View>
          </View>
        </View>
        {item.errorMessage ? <Text style={styles.errorMessage}>{item.errorMessage}</Text> : null}
        <View>
          {item.status === RecordingStatus.Ready && item.audioKey ? (
            <AudioPlayer
              audioKey={item.audioKey || ''}
              playAudio={playAudio}
            />
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.Mainheader}>
        <TouchableOpacity onPress={handleGoBack}>
          <BackIcon width={12} height={12} />
        </TouchableOpacity>
        <Text style={styles.header}>Dictaphone</Text>
        <TouchableOpacity style={styles.shareIcon}>
          <ShareIcon height={22} width={22} />
        </TouchableOpacity>
      </View>

      <View style={styles.headingContainer}>
  {!editMode ? (
    <>
      <Text style={styles.headerTitle}>{selectedCase?.name}</Text>
      <TouchableOpacity onPress={handleEditToggle}>
        <View style={styles.editButton}>
          <Text style={styles.editText}>Edit</Text>
        </View>
      </TouchableOpacity>
    </>
  ) : (
    <>
    <View style={styles.selectAllContainer}>
      
  <TouchableOpacity
                onPress={handleSelectAll}
                style={[
                  styles.selectAllButton,
                  allSelected && styles.checkboxSelected
                ]}
              >
                <Tick></Tick>      
  </TouchableOpacity>
 
  <Text style={styles.headerTitle}>Select All</Text>
</View>

      <TouchableOpacity onPress={handleEditToggle}>
        
        <View style={styles.cancelbutton}>
          <Text style={styles.editText}>Cancel</Text>
        </View>
      </TouchableOpacity>
      
    </>
  )}
</View>


      {recordings.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No recording found</Text>
          <Text style={styles.emptySubText}>This document has no recordings. Click on the microphone to start recording</Text>
        </View>
      ) : (
        <FlatList
          data={recordings}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
      
      {!checked ? ( 
        <TouchableOpacity style={styles.floatingButton} onPress={handleRecord}>
          <MicIcon height={25} width={25} />
        </TouchableOpacity>
      ):(<TouchableOpacity onPress={handleDeleteSelected}>
        <View style={styles.deleteButton}>
          <DeleteIcon width={15} height={15}/>
          <Text style={styles.deleteText}>Delete</Text>
        </View>
      </TouchableOpacity>)}
      <DeleteModalComponent
        visible={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        selectedCount={selectedItems.size}
      />
    </View>
  );
};

export default DictaphoneScreen;