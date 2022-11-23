import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import Button from "../../components/Button";
import TextInput from "../../components/TextInput";

import RecordItem from "../../components/RecordItem";

const records = [
  {
    id: 1,
    datetime: "2022/11/18 20:30",
    product_name: "Iron",
    total_amount: 30000,
    is_buy: true,
  },
  {
    id: 2,
    datetime: "2022/11/18 21:30",
    product_name: "Coffee",
    total_amount: 12000,
    is_buy: false,
  },
  {
    id: 3,
    datetime: "2022/11/18 22:19",
    product_name: "Iron",
    total_amount: 30000,
    is_buy: true,
  },
];

const RecordsList = ({}) => {
  const { id } = useParams();

  useEffect(() => {}, []);

  return (
    <div className="pt-[77px] px-[30px] w-full text-[32px] text-white">
      <div className="h-[140px] flex">
        <div className="bg-[#0C0C0C] rounded-[13px] flex justify-center items-center w-full h-[140px]">
          <TextInput
            className="text-[32px] w-full"
            placeholder="Search Record By Name"
          />
        </div>
      </div>
      <div className="mt-[44px]">
        <div className="flex">
          <RecordItem
            record={{
              datetime: "DateTime",
              product_name: "Product Name",
              total_amount: "Total Amount",
              is_buy: "Buy or Sell",
            }}
          />
        </div>
        <div className="h-[calc(100vh-400px)] overflow-y-auto">
          {records.map((record) => (
            <div key={record.id} className="flex">
              <RecordItem record={record} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecordsList;
