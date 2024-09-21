import {StyleSheet} from 'react-native';
import React from 'react';

import LinearGradient from 'react-native-linear-gradient';

const LinearGradientWrapper = ({propStyles, children}) => {
  return (
    <LinearGradient
      colors={['#101020', '#8a42ec']}
      style={[styles.container, propStyles]}>
      {children}
    </LinearGradient>
  );
};

export default LinearGradientWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
