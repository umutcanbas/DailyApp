import React, {useState} from 'react';

import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';

import EyeClose from '../../assets/svg/eye-off-fill.svg';
import EyeOpen from '../../assets/svg/eye-fill.svg';

const Input = ({
  value,
  onChangeText,
  placeholder,
  isSecure = false,
  isMultiline = false,
}) => {
  const [isSecureText, setSecureText] = useState(isSecure);

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
        multiline={isMultiline}
        secureTextEntry={isSecureText}
      />
      {isSecure && (
        <TouchableOpacity
          onPress={() => setSecureText(prev => !prev)}
          style={styles.icon}>
          {isSecureText ? (
            <EyeClose width={24} height={24} />
          ) : (
            <EyeOpen width={24} height={24} />
          )}
        </TouchableOpacity>
      )}
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
  icon: {
    padding: 5,
  },
});
