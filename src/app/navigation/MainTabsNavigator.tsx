import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { DashboardScreen } from '../../features/dashboard/DashboardScreen';
import {SettingsScreen} from '../../features/settings/SettingsScreen';
import {TicketsStackNavigator} from './TicketsStackNavigator';

export type MainTabsParamList = {
  Tickets: undefined;
  Dashboard: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<MainTabsParamList>();

export const MainTabsNavigator: React.FC = () => {
  return (
    <Tab.Navigator>
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
