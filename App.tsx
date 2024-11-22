import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { SafeAreaView, StatusBar, useColorScheme, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ToastManager from 'toastify-react-native';
import LoginScreen from './Screens/LoginScreen';
import TaskScreen from './Screens/TaskScreen';
import CaseScreen from './Screens/CaseScreen';
import AudioRecorderScreen from './Screens/RecorderScreen';
import OcrRecord from './Screens/OcrRecordSreen';
import CustomDrawerContent from './components/customDrawer'; 
import { CaseProvider } from './components/caseContext';
import DictaphoneScreen from './Screens/DictaphoneScreen';
import MenuIcon from './assets/menu.svg'; 
import PhotoCaptureScreen from './Screens/PhotoCaptureScreen';

type RootStackParamList = {
  Login: undefined; 
  Document: undefined;
  Case:undefined;
  DictaPhoneScreen:undefined;
  RecorderScreen:undefined;
  Camera:undefined;
  OcrRecord:undefined;
  state:undefined;
  
};

type DrawerParamList = {
  Documents: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

const HomeStack = ({ navigation }: any) => (
  <Stack.Navigator
    screenOptions={({ navigation }: any) => ({
      headerShown: true,
      headerTitleStyle: {
        fontWeight: '400',
        fontSize: 20,
      },
      
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 15 }}>
          <MenuIcon width={20} height={20} color='#121212' right={12} /> 
        </TouchableOpacity>
      ),
    }) as NativeStackNavigationOptions}
  >
    
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, gestureEnabled: false }}  />
    <Stack.Screen name="Document" component={TaskScreen} />
    <Stack.Screen name="Case" component={CaseScreen} options={{ headerShown: false }}  />
    <Stack.Screen name="RecorderScreen" component={AudioRecorderScreen} options={{ headerShown: false }}  />
    <Stack.Screen name="DictaPhoneScreen" component={DictaphoneScreen} options={{ headerShown: false }}  />
    <Stack.Screen name="Camera" component={PhotoCaptureScreen} options={{ headerShown: false }}  />
    <Stack.Screen name="OcrRecord" component={OcrRecord} options={{ headerShown: false }}  />


  </Stack.Navigator>
);

const MyDrawer = () => {
  const [isLogin, setIsLogin] = React.useState(true);

  return (
    <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={({ route }) => ({
      headerShown: false,
      drawerActiveBackgroundColor: '#aa18ea',
      drawerActiveTintColor: '#fff',
      drawerInactiveTintColor: '#333',
      drawerLabelStyle: {
        marginLeft: -25,
        fontFamily: 'Roboto-Medium',
        fontSize: 15,
      },
      swipeEnabled: !isLogin,  
    })}
    onStateChange={(state) => {
      const activeRoute = state?.routes[state.index]?.name;
      setIsLogin(activeRoute === 'Login');
    }}
  >
    <Drawer.Screen name="Documents" component={HomeStack} />
  </Drawer.Navigator>
);
};

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle: ViewStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <CaseProvider>
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
      <ToastManager />
      </CaseProvider>
    </SafeAreaView>
  );
};

export default App;
