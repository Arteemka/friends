import {
  ITEMS_FETCH_DATA_SUCCESS,
  ITEMS_FILTER_FETCH_DATA_SUCCESS,
  ITEMS_FETCH_DATA_ERROR,
  ITEMS_IS_LOADING,
  CURRENT_PAGE,
  CURRENT_PAGES
} from "../actions/items";

const initialState = {
  items: [],
  itemsFilter: [],
  error: false,
  isLoading: true,
  page: 1,
  pages:[]
};

export const items = (state = initialState, action) => {
  switch (action.type) {
    case ITEMS_FETCH_DATA_SUCCESS:
      return {
        ...state,
        items: action.payload
      };
    case ITEMS_FILTER_FETCH_DATA_SUCCESS:
      return {
        ...state,
        itemsFilter: action.payload
      };
      case CURRENT_PAGES:
        return {
          ...state,
          pages: action.payload
        };
    case ITEMS_FETCH_DATA_ERROR:
      return {
        ...state,
        error: action.payload
      };
      case CURRENT_PAGE:
      return {
        ...state,
        page: action.payload
      };
    case ITEMS_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    default:
      return state;
  }
};
