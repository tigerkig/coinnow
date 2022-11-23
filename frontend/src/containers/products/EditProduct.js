import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getProductAsync,
  selectProduct,
  setProduct,
} from "../../store/product";
import { getCategoriesAsync, selectCategories } from "../../store/category";

import ProductForm from "./ProductForm";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectProduct);
  const categories = useAppSelector(selectCategories);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getCategoriesAsync());
    }
    dispatch(setProduct(null));
    if (id) {
      dispatch(getProductAsync(id));
    }
  }, [dispatch]);

  return (
    (!id || product) &&
    categories &&
    categories.length != 0 && (
      <ProductForm
        product={id ? product : null}
        categories={categories}
        id={id}
      />
    )
  );
};

export default EditProduct;
