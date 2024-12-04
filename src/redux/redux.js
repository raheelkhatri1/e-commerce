import { configureStore } from "@reduxjs/toolkit";
// import conuter from "./action";
import counterSlice from "./action"

const store = configureStore({
    reducer:{
        counter: counterSlice
    }
})

export default store