import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from './routes';

import Home from '../screens/Home/Home';
import Profile from '../screens/Home/Profile';
import DailyForm from '../screens/Home/DailyForm';

const Stack = createNativeStackNavigator();

const WithOutTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={routes.HOME} component={Home} />
      <Stack.Screen name={routes.PROFILE} component={Profile} />
      <Stack.Screen
        name={routes.DAILY_FORM}
        component={DailyForm}
        options={{presentation: 'modal', gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
};

export default WithOutTab;
