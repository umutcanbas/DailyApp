
import React, {useEffect} from 'react';

import routes from '../../navigation/routes';

import LinearGradientWrapper from '../../components/LinearGradientWrapper';

import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  AsyncStorage.getItem('isLogged')
    .then(value => (isLogged = value))
    .catch(error => console.log(error));

  const handleNavigation = async () => {
    const logged = await AsyncStorage.getItem('isLogged');
    if (logged == 'true') {
      navigation.replace(routes.HOME_NAVIGATOR);
    } else {
      navigation.replace(routes.LOGIN);
    }
  };

  useEffect(() => {
    handleNavigation();
  }, []);

  return <LinearGradientWrapper></LinearGradientWrapper>;
};

export default SplashScreen;
