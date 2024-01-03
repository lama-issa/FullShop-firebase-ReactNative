import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Updated import
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        // If not found token
        props.navigation.navigate('Auth');
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        // This means expirationDate in the past, so the token is invalid
        props.navigation.navigate('Auth');
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      props.navigation.navigate('Shop');
      dispatch(authActions.authenticate(userId, token, expirationTime));
    };

    tryLogin();
  }, [dispatch, props.navigation]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartupScreen;





// import React, { useEffect } from 'react';
// import {
//   View,
//   ActivityIndicator,
//   StyleSheet,
//   AsyncStorage // to find is token is valid or not
// } from 'react-native';
// import { useDispatch } from 'react-redux';

// import Colors from '../constants/Colors';
// import * as authActions from '../store/actions/auth';

// const StartupScreen = props => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const tryLogin = async () => {
//       const userData = await AsyncStorage.getItem('userData');
//       if (!userData) { // if not found token
//         props.navigation.navigate('Auth');
//         return;
//       }
//       const transformedData = JSON.parse(userData);
//       const { token, userId, expiryDate } = transformedData;
//       const expirationDate = new Date(expiryDate);

//       if (expirationDate <= new Date() || !token || !userId) { //this means expirationDate in the past so token is invalid
//         props.navigation.navigate('Auth');
//         return;
//       }

//       const expirationTime = expirationDate.getTime() - new Date().getTime();

//       props.navigation.navigate('Shop');
//       dispatch(authActions.authenticate(userId, token, expirationTime));
//     };

//     tryLogin();
//   }, [dispatch]);

//   return (
//     <View style={styles.screen}>
//       <ActivityIndicator size="large" color={Colors.primary} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// });

// export default StartupScreen;
