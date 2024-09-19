import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import Button from '../../components/Button/Button';

import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import {useNavigation} from '@react-navigation/native';
import routes from '../../navigation/routes';
import LinearGradient from 'react-native-linear-gradient';

import BackArrow from '../../assets/svg/left-arrow.svg';
import {showMessage} from 'react-native-flash-message';

const Profile = () => {
  const navigation = useNavigation();

  const [userDaily, setUserDaily] = useState();

  const scores = userDaily?.map(daily => daily.score);
  const averageScore =
    userDaily?.length > 0
      ? scores.reduce((acc, score) => acc + score, 0) / userDaily.length
      : 0;

  const monthAverageScore =
    userDaily?.length > 0
      ? scores.reduce((acc, score) => acc + score, 0) / 30
      : 0;

  const logOut = async () => {
    try {
      await auth().signOut();
      await AsyncStorage.removeItem('isLogged');
      console.log('User logged out');
      showMessage({
        message: 'Cıkış yapıldı.',
        type: 'info',
      });
      navigation.replace(routes.AUTH_NAVIGATOR, {
        screen: routes.LOGIN,
      });
    } catch (error) {
      showMessage({
        message: 'Hata',
        type: 'danger',
      });
      console.error('Error removing isLogged:', error);
    }
  };

  //score işlemleri için
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const snapshot = await database()
            .ref(`/daily/${user.uid}`)
            .once('value');
          const obj = snapshot.val();
          if (obj === null) {
            setUserDaily([]);
          } else {
            const daily = Object.keys(obj).map(key => ({
              id: key,
              ...obj[key],
            }));

            daily.sort((a, b) => {
              const dateA = new Date(a.date.split('/').reverse().join('-'));
              const dateB = new Date(b.date.split('/').reverse().join('-'));
              return dateB - dateA;
            });

            setUserDaily(daily);
          }
        }
      } catch (error) {
        console.error('Failed to fetch user data or products:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <LinearGradient
      colors={['#101020', '#8a42ec']}
      style={styles.linearGradient}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}>
            <BackArrow width={29} height={29} />
          </TouchableOpacity>

          <Text style={styles.headerText}>Profile</Text>
        </View>

        <View style={styles.scoreContainer}>
          <View style={styles.scoreHeader}>
            <Text style={styles.scoreHeaderText}>Ortalama Puan</Text>
            <Text style={styles.scoreHeaderText}>Aylık Ortalama Puan</Text>
          </View>

          <View style={styles.scoreInnerContainer}>
            <Text style={styles.scoreText}>{averageScore}</Text>
            <Text style={styles.scoreText}>{monthAverageScore.toFixed(2)}</Text>
          </View>
        </View>

        <Button
          buttonStyle={styles.button}
          title="LogOut"
          onPress={() => logOut()}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Profile;

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
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    marginLeft: 115,
  },
  scoreContainer: {
    backgroundColor: '#fffafa1A',
    width: 350,
    height: 250,
    marginHorizontal: 10,
    marginVertical: 40,
    borderRadius: 40,

    alignItems: 'center',
  },
  scoreHeader: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 30,
  },
  scoreHeaderText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreInnerContainer: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 30,
  },
  scoreText: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  button: {
    position: 'absolute',
    top: 730,
    right: 105,
  },
});
