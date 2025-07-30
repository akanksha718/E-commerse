import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    isLoading: false,
    productList: [],
    productDetail: null,
}


export const fetchAllFilteredProducts = createAsyncThunk('/products/fetchAllProducts',
    async ({ filterParams, sortParams }) => {
        const query = new URLSearchParams({
            ...filterParams,
            sortBy: sortParams
        })
        const result = await axios.get(`http://localhost:5000/api/shop/products/get?${query}`);
        return result?.data;
    }
);


export const fetchProductDetails = createAsyncThunk('/products/fetchProductDetails',
    async (id) => {
        const result = await axios.get(`http://localhost:5000/api/shop/products/get/${id}`);
        return result?.data;
    }
);
const shoppingProductsSlice = createSlice({
    name: 'shoppingProducts',
    initialState,
    reducers: {
        setProductDetails: (state) => {
            state.productDetail = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllFilteredProducts.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = action.payload.data;
            })
            .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.productList = [];
            })
            .addCase(fetchProductDetails.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productDetail = action.payload.data;
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.productDetail = null;
            })
    }
})
export const { setProductDetails } = shoppingProductsSlice.actions;
export default shoppingProductsSlice.reducer;