import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';
import routes from '../../navigation/routes';
import LinearGradient from 'react-native-linear-gradient';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate(routes.LOGIN);
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation]);
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
