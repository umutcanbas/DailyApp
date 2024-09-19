import {
  ActionSheetIOS,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import Dots from '../../assets/svg/dots.svg';

const DailyCard = ({daily, deleteDaily, editDaily}) => {
  const onPressOptions = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Delete', 'Edit'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark',
      },
      buttonIndex => {
        if (buttonIndex === 0) {
        } else if (buttonIndex === 1) {
          deleteDaily(daily);
        } else if (buttonIndex === 2) {
          editDaily(daily);
        }
      },
    );
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.itemText}>{daily?.text}</Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.itemDate}>
          {new Date(daily?.date).toLocaleDateString()}
        </Text>
        <TouchableOpacity onPress={() => onPressOptions(daily)}>
          <Dots width={25} height={25} />
        </TouchableOpacity>
      </View>
    </View>
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
});
