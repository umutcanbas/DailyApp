import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';

import auth from '@react-native-firebase/auth';

import LinearGradientWrapper from '../../components/LinearGradientWrapper';
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
        message: 'Email gerekli.',
        type: 'danger',
      });
      return;
    } else if (password !== rePassword) {
      showMessage({
        message: 'Şifreler eşleşmiyor.',
        type: 'danger',
      });
      return;
    }
    try {
      setLoading(true);
      await auth().createUserWithEmailAndPassword(email, password);
      await AsyncStorage.setItem('isLogged', 'true');
      showMessage({
        message: 'Üyelik oluşturuldu.',
        type: 'success',
      });

      navigation.navigate(routes.WITH_OUT_TAB);
    } catch (error) {
      showMessage({
        message: 'Boş yer olamaz',
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradientWrapper>
      <SafeAreaView style={styles.header}>
        <Text style={styles.headerText}>Kayıt Ol</Text>

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

            <Input
              value={rePassword}
              onChangeText={setRePassword}
              placeholder="Şifre tekrar"
              isSecure
            />
            <View style={styles.buttonContainer}>
              <Button title="Geri" onPress={goBack} />
              <Button
                title="Kayıt Ol"
                onPress={onPressRegister}
                loading={loading}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </LinearGradientWrapper>
  );
};

export default SingUp;

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
