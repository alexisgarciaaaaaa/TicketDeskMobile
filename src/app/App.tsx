import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import { store } from './store';
import { AuthProvider } from '../features/auth/context/AuthProvider';
import { RootNavigator } from './navigation/RootNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </Provider>
  );
};

export default App;
