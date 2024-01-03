export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";
import Product from "../../models/product";
// import * as Notifications from "expo-notifications";
// import * as Permissions from "expo-permissions";

export const fetchProducts = () => {
  //to Fetching Products (Get) from the Server(firebase)
  return async (dispatch, getState) => {
    //getState: return all redux store --> object{"auth":{'token: , "userId": } ,"cart":{"items":{},"totalAmount":0},"orders":{},"products":{}}
    // any async code you want!
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        "https://proj-14074-default-rtdb.firebaseio.com//products.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            // resData[key].ownerPushToken,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter((prod) => prod.ownerId === userId),
      });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://proj-14074-default-rtdb.firebaseio.com//products/${productId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    // thunk redux dispatch function pass by thunk redux autmaticly so thunk call dispatch function

    // any async code you want!
    // let pushToken;
    // let statusObj = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    // if (statusObj.status !== "granted") {
    //   statusObj = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    // }
    // if (statusObj.status !== "granted") {
    //   pushToken = null;
    // } else {
    //   //zpushToken = (await Notifications.getExpoPushTokenAsync()).data;
    //   pushToken = await Notifications.getExpoPushTokenAsync({
    //     projectId: "98f18f3d-3fcf-4437-8261-03e4b8a0222c",
    //   });
    // }

    const token = getState().auth.token;
    const userId = getState().auth.userId;
    //return a promise
    //any async code you want
    const response = await fetch(
      // send http request
      // to  Storing Products on a Server
      `https://proj-14074-default-rtdb.firebaseio.com//products.json?auth=${token}`, //products.json:to make a products file in firebase
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          ownerId: userId,
          // ownerPushToken: pushToken,
        }),
      } // to get request // to store data
    );

    const resData = await response.json(); // data returned as object from firebase when adding products with unique id for all products
    console.log(resData); // object{name:----}

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name, // this id generated from firebase --- resData.name
        title,
        description,
        imageUrl,
        price,
        ownerId: userId,
        // pushToken: pushToken,
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://proj-14074-default-rtdb.firebaseio.com//products/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
      },
    });
  };
};
