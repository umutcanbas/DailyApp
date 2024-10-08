import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AuthNavigator from './AuthNavigator';
import HomeNavigator from './HomeNavigator'

import routes from './routes';

import FlashMessage from 'react-native-flash-message';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={routes.AUTH_NAVIGATOR} component={AuthNavigator} />
         <Stack.Screen name={routes.HOME_NAVIGATOR} component={HomeNavigator} /> 
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

export default RootNavigator;