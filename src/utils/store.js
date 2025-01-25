import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../utils/userSlice.js";
const store  = configureStore({
    reducer:{
user:userReducer },
})

export default store;