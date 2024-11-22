
module.exports = {
  preset: 'react-native',
  setupFiles: ['/Users/a/Downloads/aurues-adalat/jest.setup.js'], 
   
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@notifee)',  
  ],
  
};

