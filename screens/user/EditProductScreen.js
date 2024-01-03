// import React, { useEffect, useCallback, useReducer } from 'react';
// import { View, ScrollView, StyleSheet, Platform, Alert } from 'react-native';
// import { HeaderButtons, Item } from 'react-navigation-header-buttons';
// import { useSelector, useDispatch } from 'react-redux';
// import HeaderButton from '../../components/UI/HeaderButton';
// import * as productsActions from '../../store/actions/products';
// import Input from '../../components/UI/Input';
// import { useNavigation } from '@react-navigation/native';

// const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

// const formReducer = (state, action) => { //formReducer :Reducer function will be execute for every new action is dispatch
//   if (action.type === FORM_INPUT_UPDATE) {
//     const updatedValues = {
//       ...state.inputValues,
//       [action.input]: action.value,
//     };
//     const updatedValidities = {
//       ...state.inputValidities, // old inputValidities
//       [action.input]: action.isValid, // updated Validities for the input we just typed in
//     };
//     let updatedFormIsValid = true;
//     for (const key in updatedValidities) { // loop for all updatedValidities  if all inputValidities are vaild then form is vaild
//       updatedFormIsValid = updatedFormIsValid && updatedValidities[key]; // if at least one input is invaild then updatedFormIsValid is set false
//     }
//     return {
//       formIsValid: updatedFormIsValid,
//       inputValidities: updatedValidities,
//       inputValues: updatedValues,
//     };
//   }
//   return state;
// };

// const EditProductScreen = (props) => {
//   const prodId = props.route.params.productId;
//   const editedProduct = useSelector((state) =>
//     state.products.userProducts.find((prod) => prod.id === prodId)
//   );
//   //if click in edit so pass productId as params but when click on add icon not pass any props so if have props (productId) so editedProduct is true (so i clicked on edit) else means i clicked on add icon

//   const dispatch = useDispatch();
//   const navigation = useNavigation();

//   const [formState, dispatchFormState] = useReducer(formReducer, {
//     //formState:is update when every changed and component rerender and give a new state, dispatchFormState:function that allow to dispatc action
//    //formReducer : should be able to change state when action are dispatched
//     //useReducer function should able to change state when action are dispatched (takes reducer function (formReducer) and initail states as arguments)

//     //initail state:
//     inputValues: {
//       //save user inputs:
//       title: editedProduct ? editedProduct.title : '',
//       imageUrl: editedProduct ? editedProduct.imageUrl : '',
//       description: editedProduct ? editedProduct.description : '',
//       price: '',
//     },
//     inputValidities: {
//       title: editedProduct ? true : false,
//       imageUrl: editedProduct ? true : false,
//       description: editedProduct ? true : false,
//       price: editedProduct ? true : false,
//     },
//     formIsValid: editedProduct ? true : false,
//   });

//   const submitHandler = useCallback(() => {
//     if (!formState.formIsValid) {
//       Alert.alert('Wrong input!', 'Please check the errors in the form.', [{ text: 'Okay' }]);
//       return;
//     }
//     if (editedProduct) {
//       dispatch(
//         productsActions.updateProduct(
//           prodId,
//           formState.inputValues.title,
//           formState.inputValues.description,
//           formState.inputValues.imageUrl
//         )
//       );
//     } else {
//       dispatch(
//         productsActions.createProduct(
//           formState.inputValues.title,
//           formState.inputValues.description,
//           formState.inputValues.imageUrl,
//           +formState.inputValues.price // +price: to convert price to number
//         )
//       );
//     }
//     navigation.goBack(); // to goBack the previouse screen
//   }, [dispatch, prodId, formState, navigation]);

//   useEffect(() => {
//     navigation.setOptions({
//       headerTitle: editedProduct ? 'Edit Product' : 'Add Product',
//       headerRight: () => (
//         <HeaderButtons HeaderButtonComponent={HeaderButton}>
//           <Item
//             title="Save"
//             iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
//             onPress={submitHandler}
//           />
//         </HeaderButtons>
//       ),
//     });
//   }, [navigation, submitHandler, editedProduct]);

//   const inputChangeHandler = useCallback(
//     (inputIdentifier, inputValue, inputValidity) => {  // inputIdentifier: get information which input trigger (title or price or ...)
//       dispatchFormState({
//         type: FORM_INPUT_UPDATE, // call userReducer
//         value: inputValue,
//         isValid: inputValidity,
//         input: inputIdentifier, //get information which input is treger
//       });
//     },//dispacth reducer update ,value:text --- forward to reducer so store in aour state
//     [dispatchFormState]
//   );

//   return (
//     <ScrollView>
//       <View style={styles.form}>
//         <Input
//           id="title"
//           label="Title"
//           errorText="Please enter a valid title!"
//           keyboardType="default"
//           autoCapitalize="sentences"
//           autoCorrect
//           returnKeyType="next"
//           onInputChange={inputChangeHandler}
//           initialValue={editedProduct ? editedProduct.title : ''} // setTitle as enterd text
//           initiallyValid={!!editedProduct}
//           required
//         />
//         <Input
//           id="imageUrl"
//           label="Image Url"
//           errorText="Please enter a valid image url!"
//           keyboardType="default"
//           returnKeyType="next"
//           onInputChange={inputChangeHandler}
//           initialValue={editedProduct ? editedProduct.imageUrl : ''}
//           initiallyValid={!!editedProduct}
//           required
//         />
//         {editedProduct ? null : ( // if click in edit i dont need to display price so -- null but i want to display when add prod
//           <Input
//             id="price"
//             label="Price"
//             errorText="Please enter a valid price!"
//             keyboardType="decimal-pad"
//             returnKeyType="next"
//             onInputChange={inputChangeHandler}
//             required
//             min={0.1}
//           />
//         )}
//         <Input
//           id="description"
//           label="Description"
//           errorText="Please enter a valid description!"
//           keyboardType="default"
//           autoCapitalize="sentences"
//           autoCorrect
//           multiline
//           numberOfLines={3}
//           onInputChange={inputChangeHandler}
//           initialValue={editedProduct ? editedProduct.description : ''}
//           initiallyValid={!!editedProduct}
//           required
//           minLength={5}
//         />
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   form: {
//     margin: 20,
//   },
// });

// export default EditProductScreen;

// EditProductScreen.js

import React, {
  useLayoutEffect,
  useCallback,
  useState,
  useReducer,
  useEffect,
} from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import HeaderButton from "../../components/UI/HeaderButton";
import * as productsActions from "../../store/actions/products";
import Input from "../../components/UI/Input";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../constants/Colors";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATE:
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid,
      };
      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }
      return {
        formIsValid: updatedFormIsValid,
        inputValidities: updatedValidities,
        inputValues: updatedValues,
      };
    default:
      return state;
  }
};

const EditProductScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const prodId = props.route.params?.productId;
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      description: editedProduct ? editedProduct.description : "",
      price: editedProduct ? editedProduct.price.toString() : "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check the errors in the form.", [
        { text: "Okay" },
      ]);
      return;
    }

    setError(null);
    setIsLoading(true);
    try {
      if (editedProduct) {
        await dispatch(
          productsActions.updateProduct(
            prodId,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl
          )
        );
      } else {
        await dispatch(
          productsActions.createProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            +formState.inputValues.price
          )
        );
      }
      navigation.goBack();
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [dispatch, prodId, formState, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: editedProduct ? "Edit Product" : "Add Product",
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            iconName={
              Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
            }
            onPress={submitHandler}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation, submitHandler, editedProduct]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          id="title"
          label="Title"
          errorText="Please enter a valid title!"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.title : ""}
          initiallyValid={!!editedProduct}
          required
        />
        <Input
          id="imageUrl"
          label="Image Url"
          errorText="Please enter a valid image url!"
          keyboardType="default"
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.imageUrl : ""}
          initiallyValid={!!editedProduct}
          required
        />
        {!editedProduct ? (
          <Input
            id="price"
            label="Price"
            errorText="Please enter a valid price!"
            keyboardType="decimal-pad"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.price.toString() : ""}
            initiallyValid={!!editedProduct}
            required
            min={0.1}
          />
        ) : null}
        <Input
          id="description"
          label="Description"
          errorText="Please enter a valid description!"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          multiline
          numberOfLines={3}
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.description : ""}
          initiallyValid={!!editedProduct}
          required
          minLength={5}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditProductScreen;
