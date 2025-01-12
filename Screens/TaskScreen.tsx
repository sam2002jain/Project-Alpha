import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert, BackHandler } from 'react-native';
import styles from '../styleSheets/TaskScreenStyle';
import DocumentIcon from '../assets/document.svg';
import AddDocument from '../assets/documentadd.svg';
import ArrowIcon from '../assets/rightarrow.svg';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import NewCaseComponent from '../components/NewCaseComponent';
import { getLoginState } from '../Storage/storage';

interface CaseItem {
  id: string;
  name: string;
  date: string;
}


const TaskScreen: React.FC = () => {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [modalVisible, setModalVisible] = useState(false);
  const [caseName, setCaseName] = useState('');
  const [caseDate, setCaseDate] = useState('');
  

  useFocusEffect(
    React.useCallback(() => {
      const backNavigation = () => {
        const isLoggedIn = getLoginState();
        if (isLoggedIn) {
          BackHandler.exitApp();
          return true; 
        }
        return false; 
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', backNavigation);

      return () => backHandler.remove();
    }, [])
  );

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://alphabackend-fn3n.onrender.com/api/auth/addtask');
      console.log('Fetched tasks:', response.data); 
      setTasks(response.data); 
    } catch (error) {
      console.error('Error fetching tasks:', error);
      Alert.alert('Error', 'Failed to fetch tasks. Please try again later.');
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleClick = (caseItem: { _id: string; title: string; createdAt: string }) => {
    navigation.navigate('Case', { caseData: caseItem });
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
  const handleAddCase = () => {
    setModalVisible(true);
  };

  const renderItem = ({ item }: { item: { _id: string; title: string; createdAt: string } }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleClick(item)}>
      <View style={styles.iconContainer}>
        <DocumentIcon width={24} height={24} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDate}>{new Date(item.createdAt).toLocaleDateString()}</Text>
      </View>
      <ArrowIcon width={14} height={14} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : tasks.length > 0 ? (
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item._id} // Use `_id` as the unique key
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No tasks available</Text>
        </View>
      )}
      <TouchableOpacity style={styles.fab} onPress={handleAddCase}>
        <AddDocument width={24} height={24} />
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



