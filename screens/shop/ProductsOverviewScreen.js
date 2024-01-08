// import React, {
//   useEffect,
//   useLayoutEffect,
//   useState,
//   useCallback,
// } from "react";
// import {
//   FlatList,
//   Button,
//   Platform,
//   StyleSheet,
//   View,
//   ActivityIndicator,
//   Text,
// } from "react-native";
// import { useSelector, useDispatch } from "react-redux";
// import { HeaderButtons, Item } from "react-navigation-header-buttons";
// //useSelector :allows to tap in redux store and get our products from there
// import HeaderButton from "../../components/UI/HeaderButton";
// import * as cartActions from "../../store/actions/cart"; // import all actions from '../../store/actions/cart'
// import Colors from "../../constants/Colors";
// import { useNavigation } from "@react-navigation/native";
// import * as productsActions from "../../store/actions/products";
// import ProductList from "../../components/UI/ProductList";

// const ProductsOverviewScreen = (props) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState();
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   const navigation = useNavigation();
//   const products = useSelector((state) => state.products.availableProducts);
//   const dispatch = useDispatch();

//   const loadProducts = useCallback(async () => {
//     setError(null); // to rest eeror
//     setIsRefreshing(true);
//     try {
//       await dispatch(productsActions.fetchProducts());
//     } catch (err) {
//       setError(err.message);
//     }
//     setIsRefreshing(false);
//   }, [dispatch, setIsLoading, setError]);

//   useEffect(() => {
//     const unsubscribe = props.navigation.addListener("willFocus", loadProducts);
//     return () => {
//       unsubscribe();
//     };
//   }, [loadProducts]);

//   useEffect(() => {
//     setIsLoading(true);
//     loadProducts().then(() => {
//       setIsLoading(false);
//     });
//   }, [dispatch, loadProducts]);

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerTitle: "All Products",
//       headerLeft: () => (
//         <HeaderButtons HeaderButtonComponent={HeaderButton}>
//           <Item
//             title="Menu"
//             iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
//             onPress={() => {
//               navigation.toggleDrawer();
//             }}
//           />
//         </HeaderButtons>
//       ),
//       headerRight: () => (
//         <HeaderButtons HeaderButtonComponent={HeaderButton}>
//           <Item
//             title="Cart"
//             iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
//             onPress={() => {
//               navigation.navigate("Cart");
//             }}
//           />
//         </HeaderButtons>
//       ),
//     });
//   }, [navigation]);

//   const selectItemHandler = (id, title) => {
//     navigation.navigate("ProductDetail", {
//       productId: id,
//       productTitle: title,
//     });
//   };

//   if (error) {
//     return (
//       <View style={styles.centered}>
//         <Text>An error occurred!</Text>
//         <Button
//           title="Try again"
//           onPress={loadProducts}
//           color={Colors.primary}
//         />
//       </View>
//     );
//   }

//   if (isLoading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color={Colors.primary} />
//       </View>
//     );
//   }

//   if (!isLoading && products.length === 0) {
//     return (
//       <View style={styles.centered}>
//         <Text>No products found. Maybe start adding some!</Text>
//       </View>
//     );
//   }

//   return (
//     <FlatList
//       onRefresh={loadProducts}
//       refreshing={isRefreshing}
//       data={products}
//       keyExtractor={(item) => item.id}
//       renderItem={(itemData) => (
//         <ProductList
//           data={[itemData.item]} 
//           onSelect={(id, title) => selectItemHandler(id, title)}
//           buttonConfig={[
//             { title: "View Details", handler: (item) => selectItemHandler(item.id, item.title) },
//             { title: "To Cart", handler: (item) => dispatch(cartActions.addToCart(item)) },
//           ]}
//         />
//       )}
//     />
//   );
// };
// // function h(id, title) {
// //   selectItemHandler(id, title)
// // }

// // return (
// //   <FlatList
// //     onRefresh={loadProducts}
// //     refreshing={isRefreshing}
// //     data={products}
// //     keyExtractor={(item) => item.id}
// //     renderItem={(itemData) => (
// //       <ProductItem
// //         image={itemData.item.imageUrl}
// //         title={itemData.item.title}
// //         price={itemData.item.price}
// //         onSelect={() => {
// //           selectItemHandler(itemData.item.id, itemData.item.title);
// //         }}
// //       >
// //         <ButtonCont
// //           title="View Details"
// //           onPress={() => {
// //             selectItemHandler(itemData.item.id, itemData.item.title);
// //           }}
// //         />
// //         <ButtonCont
// //           title="To Cart"
// //           onPress={() => {
// //             dispatch(cartActions.addToCart(itemData.item));
// //           }}
// //         />
// //       </ProductItem>
// //     )}
// //   />
// // );
// const styles = StyleSheet.create({
//   centered: { flex: 1, justifyContent: "center", alignItems: "center" },
// });

// export default ProductsOverviewScreen;




import React, { useEffect, useState, useLayoutEffect, useCallback } from "react";
import { FlatList, Button, Platform, StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Badge } from 'react-native-elements';
import HeaderButton from "../../components/UI/HeaderButton";
import * as cartActions from "../../store/actions/cart";
import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import * as productsActions from "../../store/actions/products";
import ProductList from "../../components/UI/ProductList";
import { useTranslation } from 'react-i18next'; 


const ProductsOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const navigation = useNavigation();
  const products = useSelector((state) => state.products.availableProducts);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const { t } = useTranslation();


  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(productsActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("willFocus", loadProducts);
    return () => {
      unsubscribe();
    };
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);

  useEffect(() => {
    const totalItems = Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);
    setCartItemsCount(totalItems);
  }, [cartItems]);
  

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: t('All Products'),
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Cart"
            iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
            onPress={() => {
              navigation.navigate("Cart");
            }}
          />
          {/* Use absolute positioning for the badge */}
          <View style={styles.badgeContainer}>
            <Badge value={cartItemsCount} status="primary" />
          </View>
        </HeaderButtons>
      ),
    });
  }, [navigation, cartItemsCount,t]);

  const selectItemHandler = (id, title) => {
    navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductList
          data={[itemData.item]}
          onSelect={(id, title) => selectItemHandler(id, title)}
          buttonConfig={[
            // label={t('logout')}
            { title:t('View Details'), handler: (item) => selectItemHandler(item.id, item.title) },
            {  title: t('To Cart'), handler: (item) => dispatch(cartActions.addToCart(item)) },
          ]}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  badgeContainer: {
    position: "absolute",
    top: -7,
    right: 5,
  },
});

export default ProductsOverviewScreen;

