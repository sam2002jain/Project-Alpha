import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Dimensions,
} from 'react-native';
import AudioRecorderPlayer, {
  RecordBackType,
} from 'react-native-audio-recorder-player';
import Svg, {Line} from 'react-native-svg';
import Pause from '../assets/stop.svg';
import Play from '../assets/play.svg';
import Reload from '../assets/reload.svg';
import BackIcon from '../assets/back.svg';
import PauseIcon from '../assets/pause.svg';
import styles from '../styleSheets/RecorderScreenStyle';
import {setItem} from '../Storage/storage';
import {useNavigation} from '@react-navigation/native';
import {Toast} from 'toastify-react-native';
import notifee, {
  EventType,
  AndroidImportance,
  AuthorizationStatus,
} from '@notifee/react-native';
import SoundLevel from 'react-native-sound-level';
import {useCase} from '../components/caseContext';
import RNFS from 'react-native-fs';

enum Placeholder {
  starttime = '00:00:00',
}

const {width: screenWidth} = Dimensions.get('window');

const RecorderScreen: React.FC = ({route}) => {
  const navigation = useNavigation();
  const audioRecorderPlayer = useRef(new AudioRecorderPlayer()).current;
  const {selectedCase} = useCase();

  const recordTimeRef = useRef<string>('00:00:00'); 
  const [recordTime, setRecordTime] = useState<string>('00:00:00');
  const [waveform, setWaveform] = useState<number[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isResumed, setIsResumed] = useState(false);
  const [notificationId, setNotificationId] = useState<string | null>(null);

  const [pausedTimestamp, setPausedTimestamp] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const startSoundLevelMonitoring = () => {
    SoundLevel.start();
    SoundLevel.onNewFrame = data => {
      setWaveform(prevWaveform => {
        let scaledValue = Math.pow(10, data.value / 20);

        if (scaledValue < 0.01) {
          scaledValue = 0; //ignore small
        }

        const newWaveform = [...prevWaveform, scaledValue];

        if (newWaveform.length > 30) {
          newWaveform.shift(); 
        }

        return newWaveform;
      });
    };
  };

  const stopSoundLevelMonitoring = () => {
    SoundLevel.stop();
  };

  const requestNotificationPermission = async () => {
    if (Platform.OS === 'ios') {
      const settings = await notifee.requestPermission();
    } else if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }
  };

  const setCategories = async () => {
    await notifee.setNotificationCategories([
      {
        id: 'recorder',
        actions: [
          {id: 'pause', title: 'Pause'},
          {id: 'stop', title: 'Stop'},
        ],
      },
    ]);
  };

  const createNotificationChannel = async () => {
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.DEFAULT,
    });
  };

  const cancelPreviousNotification = async () => {
    if (notificationId) {
      await notifee.cancelNotification(notificationId);
    }
  };

  const displayNotification = async (
    title: string,
    body: string,
    actions: {title: string; pressAction: {id: string}}[],
    timestamp: number,
  ) => {
    await cancelPreviousNotification();

    const id = await notifee.displayNotification({
      title: title,
      body: body,
      subtitle: 'recording',
      android: {
        progress: {
          max: 10,
          current: 5,
          indeterminate: true,
        },
        largeIcon: require('../assets/sound-waves.png'),
        timestamp: timestamp,
        showTimestamp: true,
        showChronometer: true,
        channelId: 'default',
        importance: AndroidImportance.DEFAULT,
        actions: actions,
      },
      ios: {
        categoryId: 'recorder',
        foregroundPresentationOptions: {
          badge: true,
          sound: true,
          banner: true,
          list: false,
        },
        attachments: [
          {
            url: require('../assets/sound-waves.png'),
          },
        ],
      },
    });

    setNotificationId(id);
  };

  useEffect(() => {
    const unsubscribe = notifee.onForegroundEvent(({type, detail}) => {
      if (
        type === EventType.ACTION_PRESS &&
        detail.pressAction.id === 'pause'
      ) {
        onPauseRecord();
      } else if (
        type === EventType.ACTION_PRESS &&
        detail.pressAction.id === 'resume'
      ) {
        onResumeRecord();
      } else if (
        type === EventType.ACTION_PRESS &&
        detail.pressAction.id === 'stop'
      ) {
        onStopRecord();
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    createNotificationChannel();
    setCategories();
    requestNotificationPermission();

    return () => {
      stopSoundLevelMonitoring();
    };
  }, []);

  const onStartRecord = async (): Promise<void> => {
    try {
      setIsPaused(false);
      setIsResumed(false);
      setIsRecording(true);
      setElapsedTime(0);

      //const filePath = `${RNFS.CachesDirectoryPath}/audioRecording_${Date.now()}.mp4`;
      await audioRecorderPlayer.startRecorder();
      audioRecorderPlayer.addRecordBackListener(e => {
        if (e.currentPosition >= 0) {
          const currentTime = audioRecorderPlayer.mmssss(
            Math.floor(e.currentPosition),
          );
          setRecordTime(currentTime);
          recordTimeRef.current = currentTime;
        }
      });

      startSoundLevelMonitoring();
      const currentTimestamp = Date.now();
      displayNotification(
        'Recording Started',
        'In progress.',
        [
          {
            title: '&#x23F8;&#xFE0F;',
            pressAction: {id: 'pause'},
          },
          {
            title: '&#x23F9;&#xFE0F;',
            pressAction: {id: 'stop'},
          },
        ],
        currentTimestamp,
      );
    } catch (error) {
      console.log(error);
      Toast.error('Error starting recording');
    }
  };

  const onPauseRecord = async (): Promise<void> => {
    try {
      await audioRecorderPlayer.pauseRecorder();
      setIsPaused(true);
      stopSoundLevelMonitoring();
      const currentTimestamp = Date.now();
      setPausedTimestamp(currentTimestamp);
    } catch (error) {
      Toast.error('Error pausing recording');
    }
  };

  const onResumeRecord = async (): Promise<void> => {
    try {
      await audioRecorderPlayer.resumeRecorder();
      setIsPaused(false);
      setIsResumed(true);
      startSoundLevelMonitoring();
      const currentTimestamp = Date.now();
      if (pausedTimestamp) {
        const pausedDuration = currentTimestamp - pausedTimestamp;
        setElapsedTime(prevTime => prevTime + pausedDuration);
        setPausedTimestamp(null);
      }
      displayNotification(
        'Recording Resumed',
        'Your recording has resumed.',
        [
          {
            title: '&#x23F8;&#xFE0F;',
            pressAction: {id: 'pause'},
          },
          {
            title: '&#x23F9;&#xFE0F;',
            pressAction: {id: 'stop'},
          },
        ],
        currentTimestamp - elapsedTime,
      );
    } catch (error) {
      Toast.error('Error resuming recording');
    }
  };

  const onStopRecord = async (): Promise<void> => {
    try {
      const finalRecordTime = recordTimeRef.current;

      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setIsRecording(false);
      stopSoundLevelMonitoring();

      if (result) {
        const uniqueKey = `audioRecording_${selectedCase?.name}_${Date.now()}`;
        const duration = finalRecordTime;

        setItem(uniqueKey, result);

        Toast.success('Recording stopped successfully');
        cancelPreviousNotification();

        if (route.params?.onRecordingComplete) {
          route.params.onRecordingComplete(
            uniqueKey,
            duration,
            'Ready',
          );
        }

        navigation.goBack();
      }
    } catch (error) {
      Toast.error('Error stopping the recording');
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleReset = async (): Promise<void> => {
    try {
      if (isRecording || isPaused || isResumed) {
        await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
      }
      stopSoundLevelMonitoring();
      setWaveform([]);
      setRecordTime(Placeholder.starttime);
      recordTimeRef.current = Placeholder.starttime;
      setIsRecording(false);
      setIsPaused(false);
      setIsResumed(false);
    } catch (error) {
      Toast.error('Error resetting the recorder');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.Mainheader}>
        <TouchableOpacity onPress={handleGoBack}>
          <BackIcon width={16} height={16} />
        </TouchableOpacity>
        <Text style={styles.header}>Dictaphone</Text>
      </View>

      <View style={styles.headingContainer}>
        <Text style={styles.caseText}>{selectedCase?.name}</Text>
        <View style={styles.RecordingContainer}>
          <Text style={styles.recordingText}>Recording: 14/08/2024 16:01</Text>
          <TouchableOpacity onPress={handleReset}>
            <Reload
              justifyContent="flex-end"
              marginRight={50}
              height={16}
              width={16}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.waveContainer}>
        <Svg height="100" width={screenWidth}>
          {waveform.map((value, index) => (
            <Line
              key={index}
              x1={index * 5}
              y1={50 - value * 40}
              x2={index * 5}
              y2={50 + value * 40}
              stroke="blue"
              strokeWidth={value * 5}
              strokeLinecap="round"
            />
          ))}
        </Svg>
      </View>
      <View style={styles.recordtimeContainer}>
        <Text style={styles.recordTime}>{recordTime}</Text>
        {isPaused && <Text style={styles.pausedText}>Paused</Text>}
      </View>

      <View style={styles.controlsContainer}>
        <View style={styles.AudioContainer}>
          <TouchableOpacity onPress={onStopRecord} style={styles.stopButton}>
            <Pause height={20} width={20} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={
              isRecording && !isPaused
                ? onPauseRecord
                : isPaused
                ? onResumeRecord
                : onStartRecord
            }
            style={styles.pauseButton}>
            {isRecording && !isPaused ? (
              <PauseIcon height={30} width={30} />
            ) : (
              <Play height={20} width={20} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RecorderScreen;
