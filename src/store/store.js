import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});
const store = configureStore({
  reducer: rootReducer,
});

export default store;
