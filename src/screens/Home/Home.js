import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import LinearGradient from 'react-native-linear-gradient';

import {useNavigation} from '@react-navigation/native';
import routes from '../../navigation/routes';

import Profile from '../../assets/svg/profile-line.svg';
import DailyCard from '../../components/DailyCard/DailyCard';
import Modal from '../../components/Modal/Modal';

const Home = () => {
  const navigation = useNavigation();

  const goProfile = () => {
    navigation.navigate(routes.PROFILE);
  };

  return (
    <LinearGradient
      colors={['#101020', '#8a42ec']}
      style={styles.linearGradient}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Günlük</Text>
          <TouchableOpacity onPress={goProfile}>
            <Profile width={24} height={24} />
          </TouchableOpacity>
        </View>

        <Modal />
        <DailyCard />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Home;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
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
});
