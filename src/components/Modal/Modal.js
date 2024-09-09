import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';

import PlusIcon from '../../assets/svg/add-line.svg';

import {showMessage} from 'react-native-flash-message';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const deviceSize = Dimensions.get('window');

const ModalTester = ({visible, setVisible}) => {
  const [userId, setUserId] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      setUserId(user.uid);
    }
  }, []);

  const saveDaily = () => {
    if (!text.trim()) {
      setVisible(!visible);
      return;
    }

    if (userId) {
      database()
        .ref(`/daily`)
        .child(userId)
        .push({text, date: new Date().toISOString()})
        .then(() => {
          setVisible(!visible);
          showMessage({
            message: 'Eklendi',
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

  const toggleModal = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
        <PlusIcon width={43} height={43} />
      </TouchableOpacity>

      <Modal
        style={styles.modal}
        swipeDirection="down"
        isVisible={visible}
        onBackdropPress={saveDaily}
        onSwipeComplete={saveDaily}>
        <KeyboardAvoidingView
          style={styles.innerContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              {new Date().toLocaleDateString()}
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
      </Modal>
    </View>
  );
};

export default ModalTester;

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
    height: deviceSize.height / 1.2,
    width: deviceSize.width / 1.1,
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
