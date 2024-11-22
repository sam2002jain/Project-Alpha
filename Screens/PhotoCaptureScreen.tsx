import React, { useState, useEffect } from 'react';
import {
  Alert,
  Image,
  PermissionsAndroid,
  Platform,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';
import { setItem, getItem } from '../Storage/storage';
import { useCase } from '../components/caseContext'; 
import styles from '../styleSheets/PhotoCaptureScreenStyle';

const STORAGE_KEY = 'recordings';

enum errorMessage {
  noDocument = 'No documents were scanned',
  failedError = 'Failed to scan document',
}

export default ({ navigation }) => {
  const { selectedCase } = useCase();
  const [scannedImages, setScannedImages] = useState([]);
  const [error, setError] = useState(null);

  const scanDocument = async () => {
    try {
      if (Platform.OS === 'android') {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Error',
            'User must grant camera permissions to use document scanner.',
          );
          return;
        }
      }

      const { scannedImages } = await DocumentScanner.scanDocument();
      if (scannedImages.length > 0) {
        setScannedImages(scannedImages);
        const newRecording = {
          id: Date.now().toString(), 
          caseName: selectedCase?.name,
          scanTitle: `Scan on ${new Date().toLocaleString()}`,
          dateTime: new Date().toLocaleString(),
          imageCount: scannedImages.length, 
          status: 'Ready',
          images: scannedImages, 
        };

        const existingRecordings = await getItem(`${STORAGE_KEY}_${selectedCase?.name}`) || [];

        await setItem(`${STORAGE_KEY}_${selectedCase?.name}`, [...existingRecordings, newRecording]);
      } else {
        setError(errorMessage.noDocument);
      }
    } catch (err) {
      setError(errorMessage.failedError);
    }
  };


  const uploadImages = () => {
    Alert.alert('Upload', 'All scanned images uploaded successfully!');
    navigation.goBack();
  };

  useEffect(() => {
    scanDocument();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {error ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>{error}</Text>
      ) : scannedImages.length > 0 ? (
        <>
          <ScrollView>
            {scannedImages.map((imageUri, index) => (
              <Image
                key={index}
                resizeMode="contain"
                style={{ width: '100%', height: 300, marginBottom: 10 }}
                source={{ uri: imageUri }}
              />
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.uploadButton} onPress={uploadImages}>
            <Text style={styles.uploadButtonText}>Upload</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          No scanned document
        </Text>
      )}
    </View>
  );
};
