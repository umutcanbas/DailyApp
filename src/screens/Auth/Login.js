import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import auth from '@react-native-firebase/auth';

import LinearGradient from 'react-native-linear-gradient';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

import {useNavigation} from '@react-navigation/native';
import routes from '../../navigation/routes';

import {showMessage} from 'react-native-flash-message';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const goSingUp = () => {
    navigation.navigate(routes.SINGUP);
  };

  const singIn = () => {
    setLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        AsyncStorage.setItem('isLogged', 'true');

        navigation.navigate(routes.TAB_NAVIGATOR);
      })
      .catch(error => {
        showMessage({
          message: error.code,
          type: 'danger',
        });
      })
      .finally(_ => setLoading(false));
  };

  return (
    <LinearGradient
      colors={['#101020', '#8a42ec']}
      style={styles.linearGradient}>
      <SafeAreaView style={styles.header}>
        <Text style={styles.headerText}>Login</Text>

        <View style={styles.container}>
          <Input value={email} onChangeText={setEmail} placeholder="E-mail" />
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
          />

          <View style={styles.buttonContainer}>
            <Button title="Sing In" onPress={singIn} />
            <Button title="Create Account" onPress={goSingUp} />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Login;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 270,
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 35,
  },
  container: {
    marginTop: 110,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
