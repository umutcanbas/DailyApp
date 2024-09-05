import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import routes from './routes';

import Home from '../screens/Home/Home';

/* import HomeIcon from '../assets/svg/home-line.svg';
import HomeFullIcon from '../assets/svg/home-fill.svg';
import ProfileIcon from '../assets/svg/user-line.svg';
import ProfileFullIcon from '../assets/svg/user-fill.svg'; */

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const iconList = {
 
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,

        /*  tabBarStyle: {
          borderColor: 'white',
        },
        tabBarIcon: ({focused}) => {
          let Icon;

          if (route.name === routes.HOME) {
            Icon = focused ? iconList?.homeFull : iconList?.home;
          } else if (route.name === routes.NOTIFICATIONS) {
            Icon = focused ? iconList?.notificaitonFull : iconList?.notificaiton;
          } else if (route.name === routes.MESSAGE) {
            Icon = focused ? iconList?.messageFull : iconList?.message;
          } else if (route.name === routes.PROFILE) {
            Icon = focused ? iconList?.profileFull : iconList?.profile;
          }

          return <Icon width={24} height={24} />;
        }, */
      })}>
      <Tab.Screen name={routes.HOME} component={Home} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
