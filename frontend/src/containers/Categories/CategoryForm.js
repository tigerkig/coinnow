import React, { useState, useRef } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

import TextInput from "../../components/TextInput";
import Button from "../../components/Button";

const CategoryFormSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
});

const CategoryForm = ({ category, id }) => {
  const [fileContent, setFileContent] = useState(null);
  const [fileContentError, setFileContentError] = useState(null);

  const file = useRef();

  const handleUpload = (e) => {
    file.current.click();
  };

  const handleFineChange = (e) => {
    setFileContent(e.target.files[0]);
    setFileContentError(null);
  };

  const formik = useFormik({
    initialValues: {
      name: category ? category.name : "",
    },
    validationSchema: CategoryFormSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      if (fileContent) {
        formData.append("image_url", fileContent, fileContent.name);
      }

      for (let value in values) {
        formData.append(value, values[value]);
      }

      if (id) {
        axios.put(`http://97.74.82.135:8000/api/categories/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        if (!fileContent) {
          setFileContentError("Required");
          return;
        }
        axios.post("http://97.74.82.135:8000/api/categories/", formData, {
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
          <TextInput
            className="h-[98px] rounded-[13px] text-[32px] pl-[83px]"
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            placeholder="Name"
          />
        </div>
        <div className="mt-[27px] flex">
          <Button
            color="#0C0C0C"
            text={fileContent ? "Image Selected" : "Upload Image"}
            className={`w-[438px] h-[98px] ${
              fileContentError && "border-4 border-red-700"
            } ${fileContent && "border-4 border-green-500"}`}
            onClick={handleUpload}
          />
          <Button
            text="Save"
            type="submit"
            className="w-[438px] h-[98px] bg-[#0047FF] ml-[30px]"
          />
          <input
            type="file"
            ref={file}
            style={{ display: "none" }}
            onChange={handleFineChange}
          />
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
