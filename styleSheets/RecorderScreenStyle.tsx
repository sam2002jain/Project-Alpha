import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  Mainheader: {
    flexDirection: 'row',
    marginStart: 10,
    marginTop: 10,
    gap: 10,
    alignItems: 'center',
  },
  header: {
    fontSize: 18,
    fontWeight: '400',
    color: '#202124',
  },

  recodingTextContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    bottom: 65,
    right: 20,
    fontWeight: '600',
    color: '#202124',
  },
  headingContainer: {
    marginTop: 20,
    marginStart: 10,
  },
  RecordingContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 80,
  },
  caseText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#202124',
  },
  recordingText: {
    color: '#202124',
    fontWeight: '400',
  },
  waveContainer: {
    borderLeftWidth: 1,
    borderLeftColor: 'grey',
    start: '25%',
    flexDirection: 'column',
    marginTop: '30%',
    alignItems: 'center',
  },
  recordtimeContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  recordTime: {
    fontSize: 24,
    color: 'blue',
    marginVertical: '20%',
  },
  pausedText: {
    fontSize: 14,
    color: '#202124',
    marginVertical: 2,
    bottom: '35%',
  },
  controlsSubContainer: {
    flexDirection: 'column',
    //marginVertical: 0,
    bottom: '30%',
  },
  AudioContainer: {
    flexDirection: 'row',
    bottom: '50%',
  },
  controlsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    bottom: '5%',
  },
  stopButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  pauseButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});
export default styles;
