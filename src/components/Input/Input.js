import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const Input = ({
  value,
  onChangeText,
  placeholder,
  isMultiline = false,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.ınput}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="white" 
        autoCapitalize="none"
        autoCorrect={false}
        multiline={isMultiline}></TextInput>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 17,
    borderRadius: 4,
    borderWidth: 0.2,
    borderColor: 'white',
    minHeight: 40,
    maxHeight: 120,
  },
  ınput: {
    width: 300,
    color: 'white',
  },
});
