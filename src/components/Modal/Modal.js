import React, {useState} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';

function ModalTester() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.modal}>
      <TouchableOpacity onPress={toggleModal}>
        <Text style={styles.modalText}>+</Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible}>
        <View style={{backgroundColor: 'red'}}>
          <Text style={{color: 'white'}}>Hello!</Text>

          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
}

export default ModalTester;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'blue',
    position: 'absolute',
    top: 750,
    right: 155,
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 35,
  },
});
