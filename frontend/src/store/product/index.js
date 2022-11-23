import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { doGetProducts, doGetProduct } from "./apis";

const initialState = {
  products: [],
  product: null,
  status: "idle",
};

export const getProductsAsync = createAsyncThunk("get_products", () => {
  return doGetProducts().then((response) => response.data);
});

export const getProductAsync = createAsyncThunk("get_product", (id) => {
  return doGetProduct(id).then((response) => response.data);
});

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = [...action.payload];
      })
      .addCase(getProductsAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.product = { ...action.payload };
      })
      .addCase(getProductAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectProducts = (state) => state.products.products;
export const selectProduct = (state) => state.products.product;

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;
