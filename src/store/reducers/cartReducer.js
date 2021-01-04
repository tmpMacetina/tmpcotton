import {
  ADD_TO_CART,
  REMOVE_ITEM,
  SUB_QUANTITY,
  ADD_QUANTITY,
  CLEAR_CART,
  SET_CLOTHES,
  FETCH_CLOTHES_ERR,
  ORDER
} from "../actions/actionTypes/actionTypes";
import tmpItems from "../../assets/tmpData.json";

const initState = {
  localItems: tmpItems,
  items: [],
  addedItems: [],
  total: 0,
  loading: true,
  error: false,
  ordered: false
};
const cartReducer = (state = initState, action) => {
  if (action.type === ADD_TO_CART) {
    const addedItem = state.items.items.find(item => item.id === action.id);
    // check if the action id exists in the addedItems
    const itemExists = state.addedItems.find(item => action.id === item.id);
    if (itemExists) {
      addedItem.quantity += 1;

      return {
        ...state,
        addedItems: [...state.addedItems],
        total: state.total + addedItem.price
      };
    }
    addedItem.quantity = 1;
    // calculating the total
    const newTotal = state.total + addedItem.price;

    return {
      ...state,
      addedItems: [...state.addedItems, addedItem],
      total: newTotal
    };
  }
  if (action.type === REMOVE_ITEM) {
    const itemToRemove = state.addedItems.find(item => action.id === item.id);
    const newItems = state.addedItems.filter(item => action.id !== item.id);

    // calculating the total
    const newTotal = state.total - itemToRemove.price * itemToRemove.quantity;
    // console.log(itemToRemove);
    return {
      ...state,
      addedItems: newItems,
      total: newTotal
    };
  }
  // INSIDE CART COMPONENT
  if (action.type === ADD_QUANTITY) {
    const addedItem = state.items.items.find(item => item.id === action.id);
    addedItem.quantity += 1;
    const newTotal = state.total + addedItem.price;
    return {
      ...state,
      addedItems: [...state.addedItems],
      total: newTotal
    };
  }
  if (action.type === SUB_QUANTITY) {
    const addedItem = state.items.items.find(item => item.id === action.id);
    // if the qt === 0 then it should be removed
    if (addedItem.quantity === 1) {
      const newItems = state.addedItems.filter(item => item.id !== action.id);
      const newTotal = state.total - addedItem.price;
      return {
        ...state,
        addedItems: newItems,
        total: newTotal
      };
    }
    addedItem.quantity -= 1;
    const newTotal = state.total - addedItem.price;
    return {
      ...state,
      addedItems: [...state.addedItems],
      total: newTotal
    };
  }

  if (action.type === SET_CLOTHES) {
    return {
      ...state,
      items: action.items,
      loading: false
    };
  }
  if (action.type === FETCH_CLOTHES_ERR) {
    return {
      ...state,
      error: true
    };
  }

  if (action.type === CLEAR_CART) {
    return {
      ...state,
      addedItems: [],
      total: 0
    };
  }
  if (action.type === ORDER) {
    return {
      ...state,
      ordered: true
    };
  }
  return state;
};

export default cartReducer;
