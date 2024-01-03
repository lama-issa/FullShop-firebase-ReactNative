import React from "react";
import { Button, FlatList } from "react-native";
import ProductItem from "../shop/ProductItem";
import Colors from "../../constants/Colors";

const ProductList = ({ data, onSelect, buttonConfig }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => onSelect(itemData.item.id, itemData.item.title)}
        >
          {buttonConfig.map((button) => (
            <Button
              color={Colors.primary}
              key={button.title}
              title={button.title}
              onPress={() => button.handler(itemData.item)}
            />
          ))}
        </ProductItem>
      )}
    />
  );
};

export default ProductList;
