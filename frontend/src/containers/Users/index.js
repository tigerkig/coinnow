import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getUsersAsync, selectUsers } from "../../store/user";

import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import UserItem from "../../components/UserItem";

const UserList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const users = useAppSelector(selectUsers);

  useEffect(() => {
    dispatch(getUsersAsync());
  }, [dispatch]);

  const handleAddUser = () => {
    navigate("/users/create");
  };

  const handleEditUser = (id) => {
    navigate(`/users/${id}/edit`);
  };
  return (
    <div className="pt-[77px] px-[30px] w-full text-[32px] text-white">
      <div className="h-[140px] flex">
        <div className="bg-[#0C0C0C] rounded-[13px] flex justify-center items-center w-full h-[140px]">
          <TextInput
            className="text-[32px] w-full"
            placeholder="Search User By Name"
          />
        </div>
        <div className="ml-[22px] mr-[145px]">
          <Button
            color="#0047FF"
            text="Add New"
            className="w-[289px] h-[140px]"
            onClick={handleAddUser}
          />
        </div>
      </div>
      <div className="mt-[44px]">
        <div className="flex mr-[136px]">
          <UserItem
            user={{
              id: 0,
              username: "Username",
              balance: "Balance",
              inventory_worth: "Inventory Worth",
              total: "Total",
            }}
          />
        </div>
        <div className="h-[calc(100vh-400px)] overflow-y-auto">
          {users.map((user) => (
            <div key={user.id} className="flex">
              <UserItem user={user} />
              <Button
                color="#0047FF"
                className="w-[110px] h-[110px] ml-[26px]"
                text="Edit"
                onClick={() => handleEditUser(user.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
