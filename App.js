import React, { useState } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import authReducer from "./store/reducers/auth";

// import { AppLoading } from 'expo';
// import * as Font from 'expo-font';

//npx expo start

import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import ordersReducer from "./store/reducers/orders";
import NavCont from "./navigation/NavCont";
import ReduxThunk from "redux-thunk";
import { NavigationContainer } from "@react-navigation/native";
import languageReducer from "./store/reducers/languageReducer";
import LanguageDropdown from "./components/shop/LanguageDropdown";


// import * as Notifications from 'expo-notifications';

// Notifications.setNotificationHandler({
//   handleNotification: async () => {
//     return {
//       shouldShowAlert: true, // Show alert when app is running
//       shouldPlaySound: true, // Play sound
//       shouldSetBadge: true, // Set badge
//     };
//   },
// });


//dispatch action then change state

const rootReducer = combineReducers({
  products: productsReducer, //slice of state
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer, // to access to token
  language: languageReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

// const fetchFonts = () => {
//   return Font.loadAsync({
//     'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
//     'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
//   });
// };

export default function App() {
  // const [fontLoaded, setFontLoaded] = useState(false);

  // if (!fontLoaded) {
  //   return (
  //     <AppLoading
  //       startAsync={fetchFonts}
  //       onFinish={() => {
  //         setFontLoaded(true);
  //       }}
  //     />
  //   );
  // }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <LanguageDropdown /> 
        <NavCont />
      </NavigationContainer>
    </Provider>
  );
}
