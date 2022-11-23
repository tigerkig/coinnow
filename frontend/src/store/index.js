import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import productReducer from "./product";
import categoryReducer from "./category";
import userReducer from "./user";

export const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categoryReducer,
    users: userReducer,
  },
});

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
