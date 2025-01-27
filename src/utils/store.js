import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../utils/userSlice.js";
import feedReducer from "../utils/feedSlice.js";
const store  = configureStore({
    reducer:{
user:userReducer,
feed:feedReducer

},
})

export default store;