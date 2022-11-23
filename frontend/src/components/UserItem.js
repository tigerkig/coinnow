import React from "react";

const UserItem = ({ user }) => {
  return (
    <div className="flex w-full h-[110px] bg-[#222222] rounded-[13px] items-center mb-[22px]">
      <div className="w-1/4 flex items-center">
        <div className="ml-[76px]">{user.username}</div>
      </div>
      <div className="w-1/4 flex items-center">
        <div className="ml-[76px]">{user.balance}</div>
      </div>
      <div className="w-1/3 flex items-center">
        <div className="ml-[76px]">{user.inventory_worth}</div>
      </div>
      <div className="w-1/6 flex items-center">
        <div className="ml-[30px]">{user.total}</div>
      </div>
    </div>
  );
};

export default UserItem;
