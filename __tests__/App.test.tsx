// __tests__/App.test.tsx
import React from 'react';
import renderer from 'react-test-renderer';
import * as ReactNative from 'react-native';

// 👇 Forzamos el color scheme a 'light'
jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('light');

// 👇 Mock de AsyncStorage según doc oficial
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

// 👇 Mock de react-redux para no ejecutar lógica real
jest.mock('react-redux', () => {
  const React = require('react');

  return {
    Provider: ({children}: {children: React.ReactNode}) =>
      React.createElement('ReduxProvider', null, children),
    useDispatch: jest.fn(() => jest.fn()),
    useSelector: jest.fn(selector => selector({})),
  };
});

// 👇 Mock del store para no levantar Redux Toolkit / immer / etc
jest.mock('../src/app/store', () => {
  return {
    store: {
      getState: jest.fn(() => ({})),
      dispatch: jest.fn(),
      subscribe: jest.fn(() => jest.fn()),
    },
  };
});

// 👇 Mock de @react-navigation/native
jest.mock('@react-navigation/native', () => {
  const React = require('react');

  return {
    NavigationContainer: ({children}: {children: React.ReactNode}) =>
      React.createElement('NavigationContainer', null, children),
    useNavigation: jest.fn(),
    useRoute: jest.fn(),
  };
});

// 👇 Mock de @react-navigation/native-stack
jest.mock('@react-navigation/native-stack', () => {
  const React = require('react');

  return {
    createNativeStackNavigator: () => {
      const StackNavigator: React.FC<{children: React.ReactNode}> = ({
        children,
      }) => React.createElement('Stack.Navigator', null, children);

      const Screen: React.FC<{children: React.ReactNode}> = ({children}) =>
        React.createElement('Stack.Screen', null, children);

      return {
        Navigator: StackNavigator,
        Screen,
      };
    },
  };
});

// 👇 Mock de @react-navigation/bottom-tabs (para evitar ESM en node_modules)
jest.mock('@react-navigation/bottom-tabs', () => {
  const React = require('react');

  return {
    createBottomTabNavigator: () => {
      const TabNavigator: React.FC<{children: React.ReactNode}> = ({
        children,
      }) => React.createElement('Tab.Navigator', null, children);

      const Screen: React.FC<{children: React.ReactNode}> = ({children}) =>
        React.createElement('Tab.Screen', null, children);

      return {
        Navigator: TabNavigator,
        Screen,
      };
    },
  };
});

// 👇 Importamos App DESPUÉS de configurar todos los mocks
import App from '../src/app/App';

describe('App', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toBeTruthy();
  });
});
