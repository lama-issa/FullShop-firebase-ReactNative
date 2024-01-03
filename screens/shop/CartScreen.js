// // import React ,{useLayoutEffect}from 'react';
// // import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
// // import { useSelector, useDispatch } from 'react-redux';

// // import Colors from '../../constants/Colors';
// // import CartItem from '../../components/shop/CartItem';
// // import Card from '../../components/UI/Card';
// // import * as cartActions from '../../store/actions/cart';
// // import * as ordersActions from '../../store/actions/orders';
// // import { useNavigation } from '@react-navigation/native';

// // const CartScreen = props => {
// //   const navigation = useNavigation();
// //   const cartTotalAmount = useSelector(state => state.cart.totalAmount);
// //   //useSelector will always retrgers and refetch data when every redux state changes
// //   const cartItems = useSelector(state => {
// //     const transformedCartItems = []; // array of objects
// //     for (const key in state.cart.items) { //loop iterates over each key in the items object because items property containing key-value pairs
// //       //For each key in the loop, it creates an object and pushes it into the transformedCartItems array.
// //       transformedCartItems.push({
// //         productId: key,
// //         productTitle: state.cart.items[key].productTitle,
// //         productPrice: state.cart.items[key].productPrice,
// //         quantity: state.cart.items[key].quantity,
// //         sum: state.cart.items[key].sum
// //       });
// //     }
// //     return transformedCartItems.sort((a, b) =>
// //       a.productId > b.productId ? 1 : -1
// //     );
// //   });
// //   const dispatch = useDispatch();

// //   useLayoutEffect(() => {
// //     navigation.setOptions({
// //       headerTitle: 'Your Cart',
// //     });
// //   }, [navigation]);

// //   return (
// //     <View style={styles.screen}>
// //       <Card style={styles.summary}>
// //         <Text style={styles.summaryText}>
// //           Total:{' '}
// //           <Text style={styles.amount}>
// //             ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
// //           </Text>
// //         </Text>
// //         <Button
// //           color={Colors.accent}
// //           title="Order Now"
// //           disabled={cartItems.length === 0}
// //           onPress={() => {
// //             dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
// //           }}
// //         />
// //       </Card>
// //       <FlatList
// //         data={cartItems}
// //         keyExtractor={item => item.productId}
// //         renderItem={itemData => (
// //           <CartItem
// //             quantity={itemData.item.quantity}
// //             title={itemData.item.productTitle}
// //             amount={itemData.item.sum}
// //             deletable  // receve as props in CartItem
// //             onRemove={() => {
// //               dispatch(cartActions.removeFromCart(itemData.item.productId));
// //             }}
// //           />
// //         )}
// //       />
// //     </View>
// //   );
// // };

// // CartScreen.navigationOptions = {
// //   headerTitle: 'Your Cart'
// // };

// // const styles = StyleSheet.create({
// //   screen: {
// //     margin: 20
// //   },
// //   summary: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     marginBottom: 20,
// //     padding: 10
// //   },
// //   summaryText: {
// //     // fontFamily: 'open-sans-bold',
// //     fontSize: 18
// //   },
// //   amount: {
// //     color: Colors.primary
// //   }
// // });

// // export default CartScreen;

// import React, { useLayoutEffect ,useState} from 'react';
// import { View, Text, FlatList, Button, StyleSheet ,ActivityIndicator} from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';
// import { createSelector } from 'reselect';

// import Colors from '../../constants/Colors';
// import CartItem from '../../components/shop/CartItem';
// import Card from '../../components/UI/Card';
// import * as cartActions from '../../store/actions/cart';
// import * as ordersActions from '../../store/actions/orders';
// import { useNavigation } from '@react-navigation/native';

// const selectCartItems = state => state.cart.items;

// const selectTransformedCartItems = createSelector([selectCartItems], items => {
//   const transformedCartItems = [];
//   for (const key in items) {
//     transformedCartItems.push({
//       productId: key,
//       productTitle: items[key].productTitle,
//       productPrice: items[key].productPrice,
//       quantity: items[key].quantity,
//       sum: items[key].sum,
//     });
//   }
//   return transformedCartItems.sort((a, b) => (a.productId > b.productId ? 1 : -1));
// });

// const CartScreen = props => {
//   const [isLoading, setIsLoading] = useState(false);

//   const navigation = useNavigation();
//   const cartTotalAmount = useSelector(state => state.cart.totalAmount);
//   const cartItems = useSelector(selectTransformedCartItems);
//   const dispatch = useDispatch();

//   const sendOrderHandler= async () => {
//     setIsLoading(true);
//     await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount)); //wait pronise to finsh
//     setIsLoading(false);
//   }
//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerTitle: 'Your Cart',
//     });
//   }, [navigation]);

//   return (
//     <View style={styles.screen}>
//       <Card style={styles.summary}>
//         <Text style={styles.summaryText}>
//           Total:{' '}
//           <Text style={styles.amount}>
//             ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
//           </Text>
//         </Text>
//         {isLoading ? (
//           <ActivityIndicator size="small" color={Colors.primary} />
//         ) : ( //else display button
//         <Button
//           color={Colors.accent}
//           title="Order Now"
//           disabled={cartItems.length === 0}
//           onPress={sendOrderHandler}
//         />
//         )}
//       </Card>
//       {cartItems.length === 0 ? (
//         <Text style={styles.emptyCartMessage}>Your cart is empty.</Text>
//       ) : (
//         <FlatList
//           data={cartItems}
//           keyExtractor={item => item.productId}
//           renderItem={itemData => (
//             <CartItem
//               quantity={itemData.item.quantity}
//               title={itemData.item.productTitle}
//               amount={itemData.item.sum}
//               deletable
//               onRemove={() => {
//                 dispatch(cartActions.removeFromCart(itemData.item.productId));
//               }}
//             />
//           )}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   screen: {
//     margin: 20,
//   },
//   summary: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//     padding: 10,
//   },
//   summaryText: {
//     fontSize: 18,
//   },
//   amount: {
//     color: Colors.primary,
//   },
//   emptyCartMessage: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginVertical: 20,
//   },
// });

// export default CartScreen;

import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { Badge } from "react-native-elements";

import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import Card from "../../components/UI/Card";
import * as cartActions from "../../store/actions/cart";
import * as ordersActions from "../../store/actions/orders";
import { useNavigation } from "@react-navigation/native";

const selectCartItems = (state) => state.cart.items;

const selectTransformedCartItems = createSelector(
  [selectCartItems],
  (items) => {
    const transformedCartItems = [];
    for (const key in items) {
      transformedCartItems.push({
        productId: key,
        productTitle: items[key].productTitle,
        productPrice: items[key].productPrice,
        quantity: items[key].quantity,
        sum: items[key].sum,
        productPushToken: items[key].pushToken,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  }
);

const CartScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  const navigation = useNavigation();
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector(selectTransformedCartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    const totalItems = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartItemCount(totalItems);
  }, [cartItems]);

  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
    setIsLoading(false);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Your Cart",
      headerRight: () => (
        <View style={{ marginRight: 10 }}>
          <Badge value={cartItemCount} status="primary" />
        </View>
      ),
    });
  }, [navigation, cartItemCount]);

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>
            ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <Button
            color={Colors.accent}
            title="Order Now"
            disabled={cartItems.length === 0}
            onPress={sendOrderHandler}
          />
        )}
      </Card>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartMessage}>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.productId}
          renderItem={(itemData) => (
            <CartItem
              quantity={itemData.item.quantity}
              title={itemData.item.productTitle}
              amount={itemData.item.sum}
              deletable
              onRemove={() => {
                dispatch(cartActions.removeFromCart(itemData.item.productId));
              }}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
  emptyCartMessage: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
  },
});

export default CartScreen;
