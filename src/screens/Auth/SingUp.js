import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';

import auth from '@react-native-firebase/auth';

import LinearGradient from 'react-native-linear-gradient';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

import {useNavigation} from '@react-navigation/native';
import routes from '../../navigation/routes';

import {showMessage} from 'react-native-flash-message';

import AsyncStorage from '@react-native-async-storage/async-storage';

const SingUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const onPressRegister = async () => {
    if (email == '') {
      showMessage({
        message: 'Email required',
        type: 'danger',
      });
      return;
    } else if (password !== rePassword) {
      showMessage({
        message: 'Passwords do not match',
        type: 'danger',
      });
      return;
    }
    try {
      setLoading(true);
      await auth().createUserWithEmailAndPassword(email, password);
      showMessage({
        message: 'Successfully Created User',
        type: 'success',
      });
      await AsyncStorage.setItem('isLogged', 'true');

      navigation.navigate(routes.WITH_OUT_TAB);
    } catch (error) {
      showMessage({
        message: error.code,
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#101020', '#8a42ec']}
      style={styles.linearGradient}>
      <SafeAreaView style={styles.header}>
        <Text style={styles.headerText}>SingUp</Text>

        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}>
            <Input value={email} onChangeText={setEmail} placeholder="E-mail" />
            <Input
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              isSecure
            />

            <Input
              value={rePassword}
              onChangeText={setRePassword}
              placeholder="RePassword"
              isSecure
            />
          <View style={styles.buttonContainer}>
            <Button title="Go Back" onPress={goBack} />
            <Button title="Register" onPress={onPressRegister} />
          </View>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SingUp;

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
