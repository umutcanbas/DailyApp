import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import LinearGradientWrapper from '../../components/LinearGradientWrapper';

import {useNavigation} from '@react-navigation/native';
import routes from '../../navigation/routes';

import Profile from '../../assets/svg/profile-line.svg';

import DailyList from './DailyList';

import PlusIcon from '../../assets/svg/add-line.svg';

const Home = () => {
  const navigation = useNavigation();

  const goProfile = () => {
    navigation.navigate(routes.PROFILE);
  };

  return (
    <LinearGradientWrapper propStyles={styles.linearGradient}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Günlük</Text>
          <TouchableOpacity onPress={goProfile}>
            <Profile width={24} height={24} />
          </TouchableOpacity>
        </View>

        <DailyList />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(routes.DAILY_FORM)}>
          <PlusIcon width={43} height={43} />
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradientWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  linearGradient: {
    padding: 10,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 34,
  },
  button: {
    backgroundColor: 'blue',
    position: 'absolute',
    top: 730,
    right: 155,
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
