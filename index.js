/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { URL } from 'url'; 
global.URL = URL; 


AppRegistry.registerComponent(appName, () => App);
