import axios from "axios";
import {
  ADD_TO_CART,
  REMOVE_ITEM,
  SUB_QUANTITY,
  ADD_QUANTITY,
  CLEAR_CART,
  SET_CLOTHES,
  FETCH_CLOTHES_ERR,
  ORDER
} from "./actionTypes/actionTypes";

// add cart action
export const addToCart = id => {
  return {
    type: ADD_TO_CART,
    id
  };
};
// clear cart
export const clearCart = () => {
  return {
    type: CLEAR_CART
  };
};
// remove item action
export const removeItem = id => {
  return {
    type: REMOVE_ITEM,
    id
  };
};
// subtract qt action
export const subtractQuantity = id => {
  return {
    type: SUB_QUANTITY,
    id
  };
};
// add qt action
export const addQuantity = id => {
  return {
    type: ADD_QUANTITY,
    id
  };
};
export const order = () => {
  return {
    type: ORDER
  };
};
// set items when fetched
export const setClothes = items => {
  return {
    type: SET_CLOTHES,
    items,
    loading: false
  };
};
// fatch failed, show error
export const fetchClothesErr = () => {
  return {
    type: FETCH_CLOTHES_ERR
  };
};

// async get items from firebase, set them or handle error
export const initItems = () => {
  return dispatch => {
    axios
      .get("https://api.jsonbin.io/b/5fefd15e14be547060189183/2")
      .then(response => {
        dispatch(setClothes(response.data));
      })
      .catch(() => {
        dispatch(fetchClothesErr());
      });
  };
};
