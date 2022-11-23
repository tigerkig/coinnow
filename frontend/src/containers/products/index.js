import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getProductsAsync, selectProducts } from "../../store/product";

import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import ProductItem from "../../components/ProductItesm";

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const products = useAppSelector(selectProducts);

  useEffect(() => {
    dispatch(getProductsAsync());
  }, [dispatch]);

  const handleAddProduct = () => {
    navigate("/products/create");
  };

  const handleEditProduct = (id) => {
    navigate(`/products/${id}/edit`);
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
            onClick={handleAddProduct}
          />
        </div>
      </div>
      <div className="mt-[44px]">
        <div className="flex mr-[136px]">
          <ProductItem
            product={{
              id: 0,
              name: "Product Name",
              quantity: "Available Quantity",
              total: "Total Owned By Users",
              current_price: "Current Price",
            }}
          />
        </div>
        <div className="h-[calc(100vh-400px)] overflow-y-auto">
          {products.map((product) => (
            <div key={product.id} className="flex">
              <ProductItem product={product} />
              <Button
                color="#0047FF"
                className="w-[110px] h-[110px] ml-[26px]"
                text="Edit"
                onClick={() => handleEditProduct(product.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
