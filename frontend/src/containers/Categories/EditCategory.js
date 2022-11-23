import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getCategoryAsync,
  selectCategory,
  setCategory,
} from "../../store/category";

import CategoryForm from "./CategoryForm";

const EditCategory = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const category = useAppSelector(selectCategory);

  useEffect(() => {
    dispatch(setCategory(null));
    if (id) {
      dispatch(getCategoryAsync(id));
    }
  }, []);

  return (!id || category) && <CategoryForm category={category} id={id} />;
};

export default EditCategory;
