// import { AsyncStorage } from 'react-native'; //to save data and dont loss when app restarts

// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
import AsyncStorage from '@react-native-async-storage/async-storage'; //this data is stored locally on the device and remains available even if the app is closed or the device is restarted , and have  (key-value) You can store data using a specific key and later retrieve that data by using the same key.

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch( // this request sould create a new user
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB-_tspRnZO8miTYqQbjsxp4EfLVjxH0kU',
      //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key= : Endpoint from this page https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
      // AIzaSyB-_tspRnZO8miTYqQbjsxp4EfLVjxH0kU : firebase -> authentication -> setting -> project setting -> Web API Key
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already!';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const expirationDate = new Date( // how long the token is valid
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB-_tspRnZO8miTYqQbjsxp4EfLVjxH0kU',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );
// to check if email and password are existing in firebase(when user login with uncorrect email or password or not have an acount)
    if (!response.ok) { //as "CODE":400
      const errorResData = await response.json(); // object have some properties as {"error": {"code": 400, "errors": [[Object]], "message": "EMAIL_NOT_FOUND"}} --- as "message":"EMAIL_NOT_FOUND"
      const errorId = errorResData.error.message;
      console.log(errorResData)
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found!';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'This password is not valid!';
      }
      throw new Error(message);
    }

     const resData = await response.json();
    console.log(resData);
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({ // save this data as string to device storage
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString()
    })
  );
};

// // Storing data
// AsyncStorage.setItem('userToken', 'abc123');

// // Retrieving data
// const userToken = await AsyncStorage.getItem('userToken');
