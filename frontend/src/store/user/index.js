import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doGetUsers, doGetUser } from "./apis";

const initialState = {
  users: [],
  user: null,
  status: "idle",
};

export const getUsersAsync = createAsyncThunk("get_users", () => {
  return doGetUsers().then((response) => response.data);
});

export const getUserAsync = createAsyncThunk("get_user", (id) => {
  return doGetUser(id).then((response) => response.data);
});

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.status = " idle";
        state.users = [...action.payload];
      })
      .addCase(getUsersAsync.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.status = " idle";
        state.user = action.payload;
      })
      .addCase(getUserAsync.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const selectUsers = (state) => state.users.users;
export const selectUser = (state) => state.users.user;

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
