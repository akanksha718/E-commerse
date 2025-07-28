import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/index.js";
import adminProductSlice from "./admin/products-slice/index.js"
import shoppingProductsSlice from "./shop/products-slice/index.js"
import shopCartSlice from "./shop/cart-Slice/index.js"
const store=configureStore(
    {
        reducer: {
            auth:authReducer, 
            adminProducts:adminProductSlice,
            shopProducts:shoppingProductsSlice,
            shopCart :shopCartSlice,
        },
    }
);
export default store;