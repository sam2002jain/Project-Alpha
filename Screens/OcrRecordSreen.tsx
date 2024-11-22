import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ListRenderItem, Alert } from 'react-native';
import BackIcon from '../assets/back.svg';
import Tick from '../assets/tickmark.svg';
import PlusIcon from '../assets/add.svg'; 
import styles from '../styleSheets/OcrRecordStyle';
import { getItem } from '../Storage/storage';
import { useCase } from '../components/caseContext';

interface RecordingItem {
  id: string;
  caseName: string;
  scanTitle: string;
  dateTime: string;
  imageCount: number;
  status: string;
}
const STORAGE_KEY = 'recordings';

const OcrRecordScreen: React.FC = ({ navigation }) => {
  const { selectedCase } = useCase();
  const [recordings, setRecordings] = useState<RecordingItem[]>([]);

  const fetchRecordings = async () => {
    const caseRecordings = await getItem(`${STORAGE_KEY}_${selectedCase?.name}`);
    if (caseRecordings) {
      setRecordings(caseRecordings);
    }
  };

  useEffect(() => {
    fetchRecordings();
  }, [selectedCase]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchRecordings);
    return unsubscribe;
  }, [navigation]);

  const handleGoBack = (): void => {
    navigation.goBack();
  };

  const handleCapture = () => {
    navigation.navigate('Camera'); 
  };

  const renderItem: ListRenderItem<RecordingItem> = ({ item }) => {

    const statusBadgeStyle = [
      styles.statusBadge,
      item.status === 'Processing Audio' ? { backgroundColor: '#FFD700' } : {backgroundColor:'#D3EE98'},
    ];
  
    return (
      <View style={styles.scanItemContainer}>
        <View style={styles.scanItemHeader}>
          <View style={statusBadgeStyle}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
          <View style={styles.scanDetails}>
            <Text style={styles.scanTitle}>{item.caseName}</Text>
            <Text style={styles.scanDateTime}>{item.dateTime}</Text>
            <Text style={styles.imageCount}>{item.imageCount} images</Text>
          </View>
          <TouchableOpacity style={styles.arrowIcon}>
            <Tick height={20} width={20} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerSubcontainer}>
          <TouchableOpacity onPress={handleGoBack}>
            <BackIcon width={20} height={20} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>OCR</Text>
        </View>
        <TouchableOpacity style={styles.editbtncontainer}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.caseTitle}>{selectedCase?.name}</Text>

      {recordings.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No scans available</Text>
        </View>
      ) : (
        <FlatList
          data={recordings}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}

      <TouchableOpacity style={styles.floatingButton} onPress={handleCapture}>
        <PlusIcon width={35} height={35} />
      </TouchableOpacity>
    </View>
  );
};

export default OcrRecordScreen;
