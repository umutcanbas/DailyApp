import {ScrollView, StyleSheet, View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import DailyCard from '../../components/DailyCard/DailyCard';

import {useNavigation} from '@react-navigation/native';
import routes from '../../navigation/routes';
import { showMessage } from 'react-native-flash-message';

const DailyList = () => {
  const [userId, setUserId] = useState(null);
  const [userDaily, setUserDaily] = useState([]);

  const navigation = useNavigation();

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
          const daily = Object.keys(obj).map(key => {
            return {
              id: key,
              ...obj[key],
            };
          });

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

    if (userId) {
      const onValueChange = database()
        .ref(`/daily/${userId}`)
        .on('value', snapshot => {
          const obj = snapshot.val();
          if (obj === null) {
            setUserDaily([]);
          } else {
            const daily = Object.keys(obj).map(key => {
              return {
                id: key,
                ...obj[key],
              };
            });

            daily.sort((a, b) => {
              const dateA = new Date(a.date.split('/').reverse().join('-'));
              const dateB = new Date(b.date.split('/').reverse().join('-'));
              return dateB - dateA;
            });

            setUserDaily(daily);
          }
        });

      return () =>
        database().ref(`/daily/${userId}`).off('value', onValueChange);
    } else {
      fetchUserData();
    }
  }, [userId]);

  const deleteDaily = daily => {
    if (!userId) {
      console.log('User ID bulunamadı.');
      return;
    }

    let onValueChange = database()
      .ref(`/daily/${userId}/${daily.id}`)
      .remove()
      .then(() => {
        showMessage({
          message: 'Günlük başarıyla silindi.',
          type: 'success',
        });
        console.log('Günlük başarıyla silindi.');

        setUserDaily(prevDailies => prevDailies.filter(d => d.id !== daily.id));
      })
      .catch(err => {
        showMessage({
          message: 'Hata',
          type: 'error',
        });
        console.error('Günlük silinirken hata oluştu:', err);
      });

    return () =>
      database()
        .ref(`/daily/${userId}/${daily.id}`)
        .off('value', onValueChange);
  };

  const editDaily = daily => {
    navigation.navigate(routes.DAILY_FORM, {
      daily,
    });
  };

  return (
    <>
      {userDaily.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Bir şeyler yazmaya başlayın...</Text>
        </View>
      ) : (
        <ScrollView style={styles.container}>
          {userDaily.map((daily, index) => (
            <DailyCard
              key={index}
              daily={daily}
              deleteDaily={deleteDaily}
              editDaily={editDaily}
            />
          ))}
        </ScrollView>
      )}
    </>
  );
};

export default DailyList;

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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
});
