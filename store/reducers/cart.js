import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/orders";
import CartItem from "../../models/cart-item";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  items: {}, // Empty object to store cart items
  //in initial items is empty object but when clicked on (To Cart) button then i will add one item in items object {} ,object allows to store id of product as a key and value could be object with title,price,countty//({} bject where each key represents a product ID, and the corresponding value is a CartItem )
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;
      const pushToken = addedProduct.pushToken;
      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        // checks if the product with the given ID is already in the cart
        // already have the item in the cart
        updatedOrNewCartItem = new CartItem( //value
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          // pushToken,
          state.items[addedProduct.id].sum + prodPrice
        );
      } else {
        // item not in the cart, add a new entry
        updatedOrNewCartItem = new CartItem(
          1,
          prodPrice,
          prodTitle,
          // pushToken,
          prodPrice
        );
      }
      //returns a new state object with the updated items and totalAmount.
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem }, //{ id:[addedProduct.id] , value: updatedOrNewCartItem}
        totalAmount: state.totalAmount + prodPrice,
      };

    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.pid];
      const currentQty = selectedCartItem.quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        // need to reduce it, not erase it
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItem }; //copy of existing items but replace my action pid with updatedCartItem(old cart items but update quantity and sum )
      } else {
        //creates a copy of the existing items without the selected item.  (return anew items obj which includes only all items but dosent include this item with spacific pid)
        updatedCartItems = { ...state.items }; //copy of existing items
        delete updatedCartItems[action.pid]; // delete this item from items obj
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
      };
    case ADD_ORDER:
      return initialState; //to Clearing the Cart after click on (order now) button because initialState is empty items list and totalAmount=0
    //so the chartScreen is now empty and Total:$0

    case DELETE_PRODUCT: // to delete item from cart when deleting from admin
      if (!state.items[action.pid]) {
        // if item which admin delete it is not existed in cart then return existing state without change
        return state;
      }
      //else
      const updatedItems = { ...state.items }; // copy of existing items
      const itemTotal = state.items[action.pid].sum;
      delete updatedItems[action.pid];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      };
  }

  return state;
};

// **Product 1:
// ID: 'product1'
// Title: 'Laptop'
// Price: $1000

// **Product 2:
// ID: 'product2'
// Title: 'Smartphone'
// Price: $500

//When you add the Laptop and Smartphone in the cart then items will be as
// {
//   items: {
//     'product1': {  //id
//        //values
//       quantity: 1,
//       productPrice: 1000,
//       productTitle: 'Laptop',
//       sum: 1000
//     },
//     'product2': {
//       quantity: 1,
//       productPrice: 500,
//       productTitle: 'Smartphone',
//       sum: 500
//     }
//   },
//   totalAmount: 1500
// }
