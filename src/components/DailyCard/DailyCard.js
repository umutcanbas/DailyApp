import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Dots from '../../assets/svg/dots.svg';

const DailyCard = () => {
  const [userId, setUserId] = useState(null);
  const [userDaily, setUserDaily] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth().currentUser;
        if (user) {
          setUserId(user.uid);

          const snapshot = await database()
            .ref(`/daily/${user.uid}`)
            .once('value');
          const obj = snapshot.val();
          if (obj === null) {
            return setUserDaily([]);
          }
          const daily = Object.values(obj).map(value => value);

          daily.sort((a, b) => {
            const dateA = new Date(a.date.split('/').reverse().join('-'));
            const dateB = new Date(b.date.split('/').reverse().join('-'));
            return dateB - dateA;
          });

          setUserDaily(daily);
        }
      } catch (error) {
        console.error('Failed to fetch user data or products:', error);
      }
    };

    fetchUserData();
    const onValueChange = database()
      .ref(`/daily/${userId}`)
      .on('value', snapshot => {
        const obj = snapshot.val();
        if (obj === null) {
          setUserDaily([]);
        } else {
          const daily = Object.values(obj);

          daily.sort((a, b) => {
            const dateA = new Date(a.date.split('/').reverse().join('-'));
            const dateB = new Date(b.date.split('/').reverse().join('-'));
            return dateB - dateA;
          });

          setUserDaily(daily);
        }
      });

    return () => database().ref(`/daily/${userId}`).off('value', onValueChange);
  }, [userId]);

  const DailyCardItem = ({daily}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.itemText}>{daily?.text}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.itemDate}>
            {new Date(daily?.date).toLocaleDateString()}
          </Text>
          <TouchableOpacity>
            <Dots width={25} height={25} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {userDaily.map((daily, index) => (
        <DailyCardItem key={index} daily={daily} />
      ))}
    </ScrollView>
  );
};

export default DailyCard;

const styles = StyleSheet.create({
  itemContainer: {
    height: 100,
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#403C49',
    borderRadius: 10,
  },
  textContainer: {
    height: 55,
    borderBottomWidth: 1,
    borderColor: 'grey',
    marginBottom: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 22,
    color: 'white',
    fontWeight: '600',
    marginHorizontal: 5,
  },
  itemDate: {
    fontSize: 16,
    color: 'darkgrey',
    fontWeight: '500',
    marginHorizontal: 5,
  },
  container: {
    padding: 10,
  },
});
