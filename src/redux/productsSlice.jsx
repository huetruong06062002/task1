import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_BASE_URL = "https://657ece4d3e3f5b1894642cbd.mockapi.io/products";
// Tạo action async sử dụng createAsyncThunk
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
});
// Thêm sản phẩm mới
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product) => {
    try {
      const response = await axios.post(API_BASE_URL, product);
      return response.data;
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  }
);
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/${product.id}`,
        product
      );
      return response.data;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  }
);
// Xóa sản phẩm
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId) => {
    try {
      await axios.delete(`${API_BASE_URL}/${productId}`);
      return productId;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }
);

// Khởi tạo reducer
const productsSlice = createSlice({
  name: "products",
  initialState: {
    data: [],

    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addProduct.fulfilled, (state, action) => {
        const newProduct = action.payload;
        state.data = [...state.data, newProduct];
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        const index = state.data.findIndex((p) => p.id === updatedProduct.id);
        if (index !== -1) {
          state.data[index] = updatedProduct;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (product) => product.id !== action.payload
        );
      });
  },
});

export default productsSlice.reducer;
