import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CommonActions, useNavigation } from '@react-navigation/native';

import ShopNavigator from './ShopNavigator';

const NavCont = () => {
  const navigation = useNavigation();
  const isAuth = useSelector(state => {
    console.log('Auth State:', state.auth);
    return !!state.auth.token;
  });
  
  useEffect(() => {
    if (navigation && navigation.isReady && !isAuth) {
      // Reset the navigation state to Auth screen
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Auth' }],
        })
      );
    }
  }, [isAuth, navigation]);

  if (!navigation || !navigation.isReady) {
    // If navigation is not ready, return null or a loading indicator
    return null;
  }

  return <ShopNavigator />;
};

export default NavCont;
