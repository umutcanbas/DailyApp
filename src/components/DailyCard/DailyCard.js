import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

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
          setUserDaily(Object.values(obj));
        }
      });

    return () => database().ref(`/daily/${userId}`).off('value', onValueChange);
  }, [userId]);

  const DailyCardItem = ({daily}) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{daily.text}</Text>
        <Text style={styles.itemText}>{daily.date}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {userDaily.map((daily, index) => (
        <DailyCardItem key={index} daily={daily} /> // daily objesini aktarıyoruz
      ))}
    </View>
  );
};

export default DailyCard;

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
    color: 'red',
  },
  container: {
    padding: 10,
  },
});
