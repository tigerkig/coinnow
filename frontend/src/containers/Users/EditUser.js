import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getUserAsync, selectUser, setUser } from "../../store/user";

import UserForm from "./UserForm";

const EditUser = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(setUser(null));
    if (id) {
      dispatch(getUserAsync(id));
    }
  }, [dispatch]);

  return (!id || user) && <UserForm user={user} id={id} />;
};

export default EditUser;
