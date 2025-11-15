import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TicketsListScreen} from '../../features/tickets/screens/TicketsListScreen';
import { TicketDetailScreen } from '../../features/tickets/screens/TicketDetailScreen';
import {Ticket} from '../../shared/types/ticket';

export type TicketsStackParamList = {
  TicketsList: undefined;
  TicketDetail: {ticket: Ticket};
};

const Stack = createNativeStackNavigator<TicketsStackParamList>();

export const TicketsStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TicketsList"
        component={TicketsListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TicketDetail"
        component={TicketDetailScreen}
        options={{
          headerShown: false,
          presentation: 'transparentModal', // para que parezca sheet
          animation: 'slide_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
};
