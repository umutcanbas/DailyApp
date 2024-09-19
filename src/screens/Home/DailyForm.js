import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {showMessage} from 'react-native-flash-message';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const DailyForm = ({navigation, route}) => {
  const [userId, setUserId] = useState('');
  const [text, setText] = useState('');

  const daily = route.params?.daily;

  const dailyDate = daily?.date || new Date();

  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      setUserId(user.uid);
      daily !== undefined && setText(daily.text);
    }
  }, []);

  const saveDaily = () => {
    if (!text.trim()) {
      navigation.goBack();
      return;
    }

    const dailyObject = {
      text,
      date: new Date(dailyDate).toISOString(),
    };

    if (userId) {
      const databaseRef = database().ref(`/daily/${userId}`);

      const request = daily
        ? databaseRef.child(daily.id).update(dailyObject)
        : databaseRef.push(dailyObject);

      request
        .then(() => {
          navigation.goBack();
          showMessage({
            message: 'Başarılı',
            type: 'success',
          });
          setText('');
        })
        .catch(error => {
          showMessage({
            message: 'Hata',
            type: 'danger',
          });
          console.log(error, 'Error while saving daily');
        });
    } else {
      showMessage({
        message: 'Hata',
        type: 'danger',
      });
      console.log('Error: No user ID found');
    }
  };

  return (
    <View style={{flex: 1}}>
      <KeyboardAvoidingView
        style={styles.innerContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {new Date(dailyDate).toLocaleDateString()}
          </Text>

          <TouchableOpacity onPress={saveDaily}>
            <Text style={styles.headerText}>Bitti</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={setText}
          placeholder="Yazmaya başlayın..."
          placeholderTextColor="gray"
          multiline
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default DailyForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalButton: {
    backgroundColor: 'blue',
    position: 'absolute',
    top: 600,
    right: 155,
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#262628',
    borderRadius: 10,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#262628',
    color: 'white',
    fontSize: 18,
    padding: 15,
    marginTop: 20,
  },
});
