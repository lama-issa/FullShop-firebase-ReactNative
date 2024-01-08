import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';
import { useTranslation } from 'react-i18next'; 


const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTitleStyle: {
    // fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    // fontFamily: 'open-sans',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const ProductsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={{
          drawerIcon: (drawerConfig) => (
            <Ionicons name="md-cart" size={23} color={drawerConfig.color} />
          ),
        }}
      />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
};

const OrdersNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen
        name="OrdersScreen"  // Use a unique name
        component={OrdersScreen}
        options={{
          drawerIcon: (drawerConfig) => (
            <Ionicons name="md-list" size={23} color={drawerConfig.color} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};


const AdminNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={{
          drawerIcon: (drawerConfig) => (
            <Ionicons name="md-create" size={23} color={drawerConfig.color} />
          ),
        }}
      />
      <Stack.Screen name="EditProduct" component={EditProductScreen} />
    </Stack.Navigator>
  );
};

const ShopNavigator = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { t } = useTranslation();

  const CustomDrawerContent = (props) => {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
           label={t('logout')}
          onPress={() => {
            dispatch(authActions.logout());
            // navigation.navigate('Auth');
          }}
        />
      </DrawerContentScrollView>
    );
  };

  return (
    <Drawer.Navigator
      initialRouteName="Products"
      screenOptions={{
        headerShown: false, // Hide the default header in all screens
        drawerActiveTintColor: Colors.primary, // Set the active tint color for the Meals screen to red
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
     
    >
      <Drawer.Screen name="Products" component={ProductsNavigator} options={{ drawerLabel: t('product') }} />
      <Drawer.Screen name="Orders" component={OrdersNavigator} options={{ drawerLabel: t('order') }} />
      <Drawer.Screen name="Admin" component={AdminNavigator} options={{ drawerLabel: t('admin') }} />
    </Drawer.Navigator>
  );
};

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen
        name="Au"
        component={AuthScreen}
        options={{
          title: 'Authentication',
        }}
      />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Startup" component={StartupScreen} />
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Shop" component={ShopNavigator} />
    </Stack.Navigator>
  );
};

export default MainNavigator;



// import React from 'react';
// import {
//   createStackNavigator,
//   createDrawerNavigator,
//   createAppContainer
// } from 'react-navigation';
// import { Platform } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
// import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
// import CartScreen from '../screens/shop/CartScreen';
// import OrdersScreen from '../screens/shop/OrdersScreen';
// import UserProductsScreen from '../screens/user/UserProductsScreen';
// import EditProductScreen from '../screens/user/EditProductScreen';
// import Colors from '../constants/Colors';

// const defaultNavOptions = {
//   headerStyle: {
//     backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
//   },
//   headerTitleStyle: {
//     fontFamily: 'open-sans-bold'
//   },
//   headerBackTitleStyle: {
//     fontFamily: 'open-sans'
//   },
//   headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
// };

// const ProductsNavigator = createStackNavigator(
//   {
//     ProductsOverview: ProductsOverviewScreen,
//     ProductDetail: ProductDetailScreen,
//     Cart: CartScreen
//   },
//   {
//     navigationOptions: {
//       drawerIcon: drawerConfig => (
//         <Ionicons
//           name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       )
//     },
//     defaultNavigationOptions: defaultNavOptions
//   }
// );

// const OrdersNavigator = createStackNavigator( //because orders is not part of product Stack so i make another Stack for orders
//   {
//     Orders: OrdersScreen
//   },
//   {
//     navigationOptions: {
//       drawerIcon: drawerConfig => (
//         <Ionicons
//           name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       )
//     },
//     defaultNavigationOptions: defaultNavOptions
//   }
// );

// const AdminNavigator = createStackNavigator(
//     {
//       UserProducts: UserProductsScreen,
//       EditProduct: EditProductScreen
//     },
//     {
//       navigationOptions: {
//         drawerIcon: drawerConfig => (
//           <Ionicons
//             name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
//             size={23}
//             color={drawerConfig.tintColor} //change color of icons as the color of the drawer when the drawer is active
//           />
//         )
//       },
//       defaultNavigationOptions: defaultNavOptions
//     }
//   );

// const ShopNavigator = createDrawerNavigator( //list inside menu is Products,Orders,Admin
//   {
//     Products: ProductsNavigator, //when click in Products from menu then navigate to ProductsOverviewScreen
//     Orders: OrdersNavigator,  //when click in Products from menu then navigate to OrdersScreen
//     Admin: AdminNavigator
//   },
//   {
//     contentOptions: {
//       activeTintColor: Colors.primary
//     }
//   }
// );

// export default createAppContainer(ShopNavigator);
