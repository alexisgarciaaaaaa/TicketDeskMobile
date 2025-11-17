import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import {TicketsStackNavigator} from './TicketsStackNavigator';
import {DashboardScreen} from '../../features/dashboard/DashboardScreen';
import {SettingsScreen} from '../../features/settings/SettingsScreen';

export type MainTabsParamList = {
  Tickets: undefined;
  Dashboard: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<MainTabsParamList>();

export const MainTabsNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerTitleAlign: 'center',
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarIcon: ({color, size}) => {
          let iconName: string;

          switch (route.name) {
  case 'Tickets':
    iconName = 'inbox';
    break;
  case 'Dashboard':
    iconName = 'bar-chart-2';
    break;
  case 'Settings':
  default:
    iconName = 'settings';
    break;
}


          return <Icon name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen
        name="Tickets"
        component={TicketsStackNavigator}
        options={{headerShown: false, title: 'Tickets'}}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{title: 'Dashboard'}}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{title: 'Ajustes'}}
      />
    </Tab.Navigator>
  );
};
