import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const DailyCard = () => {
  const [userId, setUserId] = useState(null);
  const [userDaily, setUserDaily] = useState([]);

  useEffect(() => {
    const fetchUserDataAndProduct = async () => {
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

          // Sadece değerleri al ve userDaily dizisine ata
          const daily = Object.values(obj).map(value => value);

          setUserDaily(daily);
        }
      } catch (error) {
        console.error('Failed to fetch user data or products:', error);
      }
    };

    fetchUserDataAndProduct();
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

    // Clean up the listener on component unmount
    return () => database().ref(`/daily/${userId}`).off('value', onValueChange);
  }, [userId]);

  const DailyCardItem = ({text}) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {userDaily.map((text, index) => (
        <DailyCardItem key={index} text={text} />
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
