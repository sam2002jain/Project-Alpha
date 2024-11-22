import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CaseScreenFeature from '../components/CaseScreenFeature';
import BackIcon from '../assets/back.svg';
import { RootStackParamList } from '../components/RootStackParamList'; 
import { useNavigation, NavigationProp } from '@react-navigation/native';
import styles from '../styleSheets/CaseScreenStyle';

interface CaseScreenProps {
  route: {
    params: {
      name: string;
      date: string;
    };
  };
}

const CaseScreen: React.FC<CaseScreenProps> = ({ route }) => {
  const { caseData } = route.params;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handleGoBack = () => {
    navigation.goBack();
  };
    
  return (
    <View style={styles.container}>
        <View style={styles.Mainheader}>
        <TouchableOpacity onPress={handleGoBack}>
            <BackIcon width={12} height={12} top={8} />
        </TouchableOpacity>
      <Text style={styles.header}>{caseData.name}</Text>
      </View>

      <CaseScreenFeature caseData={caseData} />
    </View>
  );
};

export default CaseScreen;
