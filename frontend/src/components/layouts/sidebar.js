import React from "react";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/home");
  };

  const handleProduct = () => {
    navigate("/products");
  };

  const handleCategory = () => {
    navigate("/categories");
  };

  const handleUser = () => {
    navigate("/users");
  };

  return (
    <div className="w-[340px] h-[100vh] bg-[#0C0C0C] rounded-[13px]">
      <div>
        <div
          className="text-[30px] text-white pt-[77px] ml-[37px]"
          onClick={handleHome}
        >
          {"Coinnow Tech"}
        </div>
      </div>
      <div className="pt-[170px] ml-[37px] text-[30px] text-white">
        <div className="cursor-pointer" onClick={handleCategory}>
          {">Categories"}
        </div>
        <div className="mt-8 cursor-pointer" onClick={handleProduct}>
          {">Products"}
        </div>
        <div className="mt-8 cursor-pointer" onClick={handleUser}>
          {">Users"}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
