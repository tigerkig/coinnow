import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getCategoriesAsync, selectCategories } from "../../store/category";

import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import CategoryItem from "../../components/CategoryItem";

const CategoryList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const categories = useAppSelector(selectCategories);

  useEffect(() => {
    dispatch(getCategoriesAsync());
  }, [dispatch]);

  const handleAddCategory = () => {
    navigate("/categories/create");
  };

  const handleEditCategory = (id) => {
    navigate(`/categories/${id}/edit`);
  };

  return (
    <div className="pt-[77px] px-[30px] w-full text-[32px] text-white">
      <div className="h-[140px] flex">
        <div className="bg-[#0C0C0C] rounded-[13px] flex justify-center items-center w-full h-[140px]">
          <TextInput
            className="text-[32px] w-full"
            placeholder="Search Product By Name"
          />
        </div>
        <div className="ml-[22px] mr-[145px]">
          <Button
            color="#0047FF"
            text="Add New"
            className="w-[289px] h-[140px]"
            onClick={handleAddCategory}
          />
        </div>
      </div>
      <div className="mt-[44px]">
        <div className="flex mr-[136px]">
          <CategoryItem
            category={{
              id: "ID",
              name: "Category Name",
            }}
          />
        </div>
        <div className="h-[calc(100vh-400px)] overflow-y-auto">
          {categories.map((category) => (
            <div key={category.id} className="flex">
              <CategoryItem category={category} />
              <Button
                color="#0047FF"
                className="w-[110px] h-[110px] ml-[26px]"
                text="Edit"
                onClick={() => handleEditCategory(category.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
