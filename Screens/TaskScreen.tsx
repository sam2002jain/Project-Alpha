import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, BackHandler } from 'react-native';
import styles from '../styleSheets/TaskScreenStyle';
import DocumentIcon from '../assets/document.svg';
import AddDocument from '../assets/documentadd.svg';
import ArrowIcon from '../assets/rightarrow.svg';
import tasks from '../utils/task.json';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import NewCaseComponent from '../components/NewCaseComponent'; 
import { getLoginState } from '../Storage/storage'; 

interface CaseItem {
  id: string;
  name: string;
  date: string;
}

const TaskScreen: React.FC = () => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [caseName, setCaseName] = useState('');
  const [caseDate, setCaseDate] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      const backNavigation = () => {
        const isLoggedIn = getLoginState();
        if (isLoggedIn) {
          BackHandler.exitApp();
          return true; // Handle back press
        }
        return false; // Allow default behavior
      };

      // Add the event listener for the back press
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backNavigation);

      // Cleanup the event listener when the screen is unfocused
      return () => backHandler.remove();
    }, [])
  );
  

  const handleClick = (caseItem: CaseItem) => {
    navigation.navigate('Case', { caseData: caseItem });
  };

  const handleAddCase = () => {
    setModalVisible(true);
  };

  const handleSubmit = () => {
    const newCase: CaseItem = {
      id: (tasks.length + 1).toString(),
      name: caseName,
      date: caseDate,
    };

    tasks.push(newCase);

    setCaseName('');
    setCaseDate('');
    setModalVisible(false);
  };

  const renderItem = ({ item }: { item: CaseItem }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleClick(item)}>
      <View style={styles.iconContainer}>
        <DocumentIcon width={24} height={24} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemDate}>{item.date}</Text>
      </View>
      <ArrowIcon width={14} height={14} /> 
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.fab} onPress={handleAddCase}>
        <AddDocument width={24} height={24}/>
      </TouchableOpacity>

      <NewCaseComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        caseName={caseName}
        setCaseName={setCaseName}
        caseDate={caseDate}
        setCaseDate={setCaseDate}
        handleSubmit={handleSubmit}
      />
    </View>
  );
};

export default TaskScreen;
