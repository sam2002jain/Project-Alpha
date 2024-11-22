import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import styles from '../styleSheets/CaseScreenStyle';
import ScannerIcon from '../assets/scanner.svg';
import DictaPhoneIcon from '../assets/dictaphone.svg';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './RootStackParamList';
import { useCase } from '../components/caseContext';


interface CaseScreenFeatureProps {
  caseData: {
    id: string;
    name: string;
    date: string;
  };
}

const CaseScreenFeature: React.FC<CaseScreenFeatureProps> = ({ caseData }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { setSelectedCase } = useCase(); 
    const handleaudio = () => {
      setSelectedCase(caseData); 
      navigation.navigate('DictaPhoneScreen');
    };

  const handleOCR = () => {
    setSelectedCase(caseData);
    navigation.navigate('OcrRecord');
  };
  return (
    <View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Audio Features</Text>
        <TouchableOpacity style={styles.card} onPress={handleaudio}>
          <View style={styles.iconPlaceholder}>
            <DictaPhoneIcon width={40} height={40} /> 
          </View>
          <Text style={styles.cardText}>Dictaphone</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Image Features</Text>
        <TouchableOpacity style={styles.card} onPress={handleOCR}>
          <View style={styles.iconPlaceholder}>
            <ScannerIcon width={40} height={40}/>
          </View>
          <Text style={styles.cardText}>OCR</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CaseScreenFeature;

