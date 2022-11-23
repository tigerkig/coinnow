import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "../src/store";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import SideBar from "./components/layouts/sidebar";
import ProductList from "./containers/products";
import EditProduct from "./containers/products/EditProduct";
import CategoryList from "./containers/Categories";
import EditCategory from "./containers/Categories/EditCategory";
import UserList from "./containers/Users";
import EditUser from "./containers/Users/EditUser";
import RecordsList from "./containers/Users/RecordsList";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="bg-[#292B2E] w-screen flex">
          <SideBar />
          <Routes>
            <Route exact path="/categories" element={<CategoryList />} />
            <Route exact path="/categories/create" element={<EditCategory />} />
            <Route
              exact
              path="/categories/:id/edit"
              element={<EditCategory />}
            />
            <Route exact path="/products" element={<ProductList />} />
            <Route exact path="/products/create" element={<EditProduct />} />
            <Route exact path="/products/:id/edit" element={<EditProduct />} />
            <Route exact path="/users" element={<UserList />} />
            <Route exact path="/users/create" element={<EditUser />} />
            <Route exact path="/users/:id/edit" element={<EditUser />} />
            <Route exact path="/users/:id/records" element={<RecordsList />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
