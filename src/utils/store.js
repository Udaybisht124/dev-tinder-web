import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../utils/userSlice.js";
import feedReducer from "../utils/feedSlice.js"
import connectionReducer from "../utils/connectionSlice.js"
import requestReducer from "../utils/requestSlice.js"
const store  = configureStore({
    reducer:{
user:userReducer,
feed:feedReducer,
connection:connectionReducer,
request:requestReducer
},
})

export default store;