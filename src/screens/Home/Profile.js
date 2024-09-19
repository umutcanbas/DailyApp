import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import Button from '../../components/Button/Button';

import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

import {useNavigation} from '@react-navigation/native';
import routes from '../../navigation/routes';
import LinearGradient from 'react-native-linear-gradient';

import BackArrow from '../../assets/svg/left-arrow.svg';
import { showMessage } from 'react-native-flash-message';

const Profile = () => {
  const navigation = useNavigation();

  const logOut = async () => {
    try {
      await auth().signOut();
      await AsyncStorage.removeItem('isLogged');
      console.log('User logged out');
      showMessage({
        message: 'Cıkış yapıldı.',
        type: 'info',
      });
      navigation.navigate(routes.AUTH_NAVIGATOR, {
        screen: routes.LOGIN,
      });
    } catch (error) {
      console.error('Error removing isLogged:', error);
    }
  };
  return (
    <LinearGradient
      colors={['#101020', '#8a42ec']}
      style={styles.linearGradient}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}>
            <BackArrow width={29} height={29} />
          </TouchableOpacity>

          <Text style={styles.headerText}>Profile</Text>
        </View>
        <Button title="LogOut" onPress={() => logOut()} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Profile;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    padding: 10,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    marginLeft: 115,
  },
});
