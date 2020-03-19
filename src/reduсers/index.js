import { combineReducers } from "redux";

import { items } from "./itemsReducers";

export const reducer = combineReducers({
  items: items
});
