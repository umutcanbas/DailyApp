import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Button from '../../components/Button/Button';

import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

import { useNavigation } from '@react-navigation/native';
import routes from '../../navigation/routes';


const Profile = () => {

  const navigation = useNavigation()

  const logOut = async () => {
    try {
      await auth().signOut();
      await AsyncStorage.removeItem('isLogged');
      console.log('User logged out');
      //flashmessage ekle
      navigation.navigate(routes.AUTH_NAVIGATOR, {
        screen: routes.LOGIN,
      })
    } catch (error) {
      console.error('Error removing isLogged:', error);
    }
  };
  return (
    <SafeAreaView>
      <Text>Profile</Text>
      <Button title='Log Out' onPress={logOut} />
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})