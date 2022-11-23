import React from "react";

const CategoryItem = ({ category }) => {
  return (
    <div className="flex w-full h-[110px] bg-[#222222] rounded-[13px] items-center mb-[22px]">
      <div className="w-1/4 flex items-center">
        <div className="ml-[76px]">{category.id}</div>
      </div>
      <div className="w-3/4 flex items-center">
        <div className="ml-[76px]">{category.name}</div>
      </div>
    </div>
  );
};

export default CategoryItem;
