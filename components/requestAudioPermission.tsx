import { request, PERMISSIONS } from 'react-native-permissions';

const requestAudioPermission = async () => {
  const result = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
  return result === 'granted';
};
