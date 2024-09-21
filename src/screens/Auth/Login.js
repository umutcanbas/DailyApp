import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';

import auth from '@react-native-firebase/auth';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import LinearGradientWrapper from '../../components/LinearGradientWrapper';

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
        showMessage({
          message: 'Giriş yapıldı.',
          type: 'success',
        });

        navigation.replace(routes.HOME_NAVIGATOR);
      })
      .catch(error => {
        showMessage({
          message: 'Bir hata oluştu',
          type: 'danger',
        });
      })
      .finally(_ => setLoading(false));
  };

  return (
    <LinearGradientWrapper>
      <SafeAreaView style={styles.header}>
        <Text style={styles.headerText}>Giriş Yap</Text>

        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}>
            <Input value={email} onChangeText={setEmail} placeholder="E-mail" />
            <Input
              value={password}
              onChangeText={setPassword}
              placeholder="Şifre"
              isSecure
            />

            <View style={styles.buttonContainer}>
              <Button title="Giriş Yap" onPress={singIn} loading={loading} />
              <Button title="Hesap Oluştur" onPress={goSingUp} />
            </View>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </LinearGradientWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
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
