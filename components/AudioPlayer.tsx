import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider'; 
import Play from '../assets/audioplay.svg';
import Forward from '../assets/timeforward.svg';
import Backward from '../assets/timeback.svg';
import Pause from '../assets/pause.svg';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

interface AudioPlayerProps {
  audioKey: string;
  playAudio: (audioKey: string) => Promise<string | null>;
}

const audioRecorderPlayer = new AudioRecorderPlayer();

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioKey, playAudio }) => {
  const [progress, setProgress] = useState<number>(0.00); 
  const [duration, setDuration] = useState<number>(0.00); 
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioPath, setAudioPath] = useState<string | null>(null);

  useEffect(() => {
    const loadAudio = async () => {
      const path = await playAudio(audioKey);
      console.log(path);
      setAudioPath(path);
    };
    loadAudio();
    
    return () => {
      audioRecorderPlayer.removePlayBackListener();
    };
  }, [audioKey]);

  const handlePlayPause = async () => {
    if (isPlaying) {
      await audioRecorderPlayer.pausePlayer();
      setIsPlaying(false);
    } else {
      if (audioPath) {
        await audioRecorderPlayer.startPlayer(audioPath);
        console.log(audioPath);
        audioRecorderPlayer.addPlayBackListener((e) => {
          setProgress(e.currentPosition / 1000); 
          setDuration(e.duration / 1000); 
          if (e.currentPosition === e.duration) {
            setIsPlaying(false);
            audioRecorderPlayer.stopPlayer();
          }
        });
        setIsPlaying(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={progress}
        minimumTrackTintColor="#0000FF" 
        maximumTrackTintColor="#FFFFFF"
        thumbTintColor="#FFFFFF"
        onValueChange={(value: number) => setProgress(value)}
      />
      <View style={styles.controls}>
        <Text style={styles.timeText}>{formatTime(progress)}</Text>
        <TouchableOpacity onPress={() => setProgress(prev => Math.max(prev - 0.10, 0))}>
          <Backward height={24} width={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePlayPause}>
          {isPlaying ? (
            <Pause height={40} width={40} />
          ) : (
            <Play height={40} width={40} />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setProgress(prev => Math.min(prev + 0.10, duration))}>
          <Forward height={24} width={24} />
        </TouchableOpacity>
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
};

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.round(time % 60);
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: '#F0F0FF',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  slider: {
    width: '100%',
    height: 10,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default AudioPlayer;
