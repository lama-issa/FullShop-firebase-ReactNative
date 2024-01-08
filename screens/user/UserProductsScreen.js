import React, { useLayoutEffect } from "react";
import { FlatList, Button, Platform, Alert, View, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import HeaderButton from "../../components/UI/HeaderButton";
import * as productsActions from "../../store/actions/products";
import ProductList from "../../components/UI/ProductList";
import { useTranslation } from 'react-i18next';


const UserProductsScreen = () => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { t } = useTranslation();

  const editProductHandler = (id) => {
    navigation.navigate("Admin", {
      screen: "EditProduct",
      params: { productId: id },
    });
  };

  const deleteHandler = (id) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(productsActions.deleteProduct(id));
        },
      },
    ]);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: t('Your Products'),
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
            title="Add"
            iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
            onPress={() => {
              navigation.navigate("Admin", {
                screen: "EditProduct",
              });
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation,t]);

  if (userProducts.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No products found, maybe start creating some?</Text>
      </View>
    );
  }

  return (
    <ProductList
    data={userProducts}
    onSelect={(id) => editProductHandler(id)}
    buttonConfig={[
      { title: t('Edit'), handler: (item) => editProductHandler(item.id) },
      { title: t('Delete'), handler: (item) => deleteHandler(item.id) },
    ]}
  />
    // <FlatList
    //   data={userProducts}
    //   keyExtractor={(item) => item.id}
    //   renderItem={(itemData) => (
    //     <ProductItem
    //       image={itemData.item.imageUrl}
    //       title={itemData.item.title}
    //       price={itemData.item.price}
    //       onSelect={() => {
    //         editProductHandler(itemData.item.id);
    //       }}
    //     >
    //       <ButtonCont
    //         title="Edit"
    //         onPress={() => {
    //           editProductHandler(itemData.item.id);
    //         }}
    //       />
    //       <ButtonCont
    //         title="Delete"
    //         onPress={() => {
    //           deleteHandler(itemData.item.id);
    //         }}
    //       />
    //     </ProductItem>
    //   )}
    // />
  );
};

export default UserProductsScreen;
