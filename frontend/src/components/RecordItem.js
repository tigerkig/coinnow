import { bool } from "prop-types";
import React from "react";

const RecordItem = ({ record }) => {
  return (
    <div className="flex w-full h-[110px] bg-[#222222] rounded-[13px] items-center mb-[22px]">
      <div className="w-1/4 flex items-center">
        <div className="ml-[76px]">{record.datetime}</div>
      </div>
      <div className="w-1/4 flex items-center">
        <div className="ml-[76px]">{record.product_name}</div>
      </div>
      <div className="w-1/3 flex items-center">
        <div className="ml-[76px]">{record.total_amount}</div>
      </div>
      <div className="w-1/6 flex items-center">
        <div className="ml-[30px]">
          {typeof record.is_buy === "boolean"
            ? record.is_buy
              ? "Bought"
              : "Sold"
            : record.is_buy}
        </div>
      </div>
    </div>
  );
};

export default RecordItem;
