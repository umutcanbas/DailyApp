import {StyleSheet, Text,  TouchableOpacity, View} from 'react-native';
import React from 'react';

const Button = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
     <Text style={styles.text} >{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
    button: {
        width: 154,
        height: 40,
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 0.2,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',

      },
      text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
      },
});
