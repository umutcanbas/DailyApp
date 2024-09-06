import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';
import routes from '../../navigation/routes';

import LinearGradient from 'react-native-linear-gradient';

import AsyncStorage from '@react-native-async-storage/async-storage';


const SplashScreen = () => {
  const navigation = useNavigation();

  let isLogged = false;

  AsyncStorage.getItem('isLogged')
  .then(value => (isLogged = value))
  .catch(error => console.log(error));
  
  
  useEffect(() => {
      setTimeout(() => {
      if (isLogged == 'true' ) {
        navigation.navigate(routes.WITH_OUT_TAB);
      } else {
        navigation.navigate(routes.LOGIN);
      }
    }, 1000);
  }, []);

  return (
    <LinearGradient
      colors={['#101020', '#8a42ec']}
      style={styles.linearGradient}></LinearGradient>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
});
