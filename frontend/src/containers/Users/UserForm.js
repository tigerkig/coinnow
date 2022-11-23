import React from "react";
import axios from "axios";
import { useFormik } from "formik";

import Button from "../../components/Button";
import TextInput from "../../components/TextInput";

const UserForm = ({ user, id }) => {
  const formik = useFormik({
    initialValues: {
      fullname: user ? user.fullname : "",
      username: user ? user.username : "",
      phone_number: user ? user.phone_number : 1,
      password: user ? user.password : "",
      balance: user ? user.balance : 1000,
    },
    onSubmit: (values) => {
      const formData = new FormData();

      for (let value in values) {
        formData.append(value, values[value]);
      }

      if (id) {
        axios.put(`http://97.74.82.135:8000/api/users/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        axios.post("http://97.74.82.135:8000/api/users/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
    },
  });
  return (
    <div className="mt-[77px] ml-[93px] pl-[36px] pr-[43px] bg-[#222222] rounded-[13px] w-[1379px] mb-[30px]">
      <form onSubmit={formik.handleSubmit}>
        <div className="mt-[22px]">
          <Button
            color="#0047FF"
            text={"User Data"}
            className="mr-[37px] w-[438px] h-[104px]"
          />
        </div>
        <div className="w-full mt-[43px]">
          <div>
            <div className="w-full flex">
              <div className="w-1/2 pr-[42px]">
                <TextInput
                  label="Full Name"
                  id="fullname"
                  name="fullname"
                  className="h-[98px] rounded-[13px] text-[32px]"
                  value={formik.values.fullname}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="w-1/2 pl-[42px]">
                <TextInput
                  id="username"
                  label="Username"
                  name="username"
                  className="h-[98px] rounded-[13px] text-[32px]"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div className="w-full flex mt-[42px]">
              <div className="w-1/2 pr-[42px]">
                <TextInput
                  id="phone_number"
                  label="Phone Number"
                  name="phone_number"
                  type="number"
                  className="h-[98px] rounded-[13px] text-[32px]"
                  value={formik.values.phone_number}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="w-1/2 pl-[42px]">
                <TextInput
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  className="h-[98px] rounded-[13px] text-[32px]"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div className="w-full flex mt-[42px]">
              <div className="w-1/2 pr-[42px]">
                <TextInput
                  id="balance"
                  label="Balance"
                  name="balance"
                  type="number"
                  className="h-[98px] rounded-[13px] text-[32px]"
                  value={formik.values.balance}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div className="w-full flex mt-[93px]">
              <div className="w-1/2"></div>
              <div className="w-1/2 pl-[42px]">
                <Button
                  text="Save"
                  type="submit"
                  className="w-[438px] h-[104px] bg-[#0047FF]"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
