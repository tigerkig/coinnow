import React from "react";

const ProductItem = ({ product }) => {
  return (
    <div className="flex w-full h-[110px] bg-[#222222] rounded-[13px] items-center mb-[22px]">
      <div className="w-1/4 flex items-center">
        <div className="ml-[76px]">{product.name}</div>
      </div>
      <div className="w-1/4 flex items-center">
        <div className="ml-[76px]">{product.quantity}</div>
      </div>
      <div className="w-1/3 flex items-center">
        <div className="ml-[76px]">{product.total}</div>
      </div>
      <div className="w-1/6 flex items-center">
        <div className="ml-[30px]">{product.current_price}</div>
      </div>
    </div>
  );
};

export default ProductItem;
