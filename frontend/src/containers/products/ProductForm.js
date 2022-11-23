import React, { useState, useRef } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import TextArea from "../../components/TextArea";

const ProductFormSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  current_price: Yup.number().required("Required"),
  quantity: Yup.number().required("Required"),
  minimum_price: Yup.number().required("Required"),
  maximum_price: Yup.number().required("Required"),
  auto_stock_amount: Yup.number().required("Required"),
  price_change_amount: Yup.number().required("Required"),
  auto_quantity_change: Yup.number().required("Required"),
});

const ProductForm = ({ product, categories, id }) => {
  const [pageType, setPageType] = useState("general");
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
      name: product ? product.name : "",
      category_id: product ? product.category_id : 1,
      description: product ? product.description : "",
      current_price: product ? product.current_price : 100,
      quantity: product ? product.quantity : 10,
      minimum_price: product ? product.minimum_price : 10,
      maximum_price: product ? product.maximum_price : 100,
      auto_stock_amount: product ? product.auto_stock_amount : 100,
      price_change_amount: product ? product.price_change_amount : 100,
      auto_quantity_change: product ? product.auto_quantity_change : 100,
    },
    validationSchema: ProductFormSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      if (fileContent) {
        formData.append("image_url", fileContent, fileContent.name);
      }

      for (let value in values) {
        formData.append(value, values[value]);
      }

      if (id) {
        axios.put(`http://97.74.82.135:8000/api/products/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        if (!fileContent) {
          setFileContentError("Required");
          return;
        }
        axios.post("http://97.74.82.135:8000/api/products/", formData, {
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
            color={`${pageType === "general" ? "#0047FF" : "#0C0C0C"}`}
            text={"General Information"}
            className="mr-[37px] w-[438px] h-[104px]"
            onClick={() => setPageType("general")}
          />
          <Button
            color={`${pageType === "data" ? "#0047FF" : "#0C0C0C"}`}
            text={"Data"}
            className="w-[438px] h-[104px]"
            onClick={() => setPageType("data")}
          />
        </div>
        <div className="w-full mt-[43px]">
          {pageType === "general" ? (
            <div>
              <div>
                <TextInput
                  className="h-[98px] rounded-[13px] text-[32px] pl-[83px]"
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  placeholder="Name"
                />
              </div>
              <div className="mt-[30px]">
                <select
                  id="category_id"
                  name="category_id"
                  className="h-[98px] rounded-[13px] text-[32px] w-full bg-[#0C0C0C] text-white pl-[83px]"
                  value={formik.values.category_id}
                  placeholder="Select Category"
                  onChange={formik.handleChange}
                >
                  {categories.map((category) => (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-[14px]">
                <TextArea
                  className="h-[400px] rounded-[13px] text-[32px] w-full pl-[83px] pt-3"
                  placeholder="Description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="mt-[27px]">
                <Button
                  color="#0C0C0C"
                  text="Upload Image"
                  className={`w-[438px] h-[98px] ${
                    fileContentError && "border-4 border-red-700"
                  } ${fileContent && "border-4 border-green-500"}`}
                  onClick={handleUpload}
                />
                <input
                  type="file"
                  ref={file}
                  style={{ display: "none" }}
                  onChange={handleFineChange}
                />
              </div>
            </div>
          ) : (
            pageType === "data" && (
              <div>
                <div className="w-full flex">
                  <div className="w-1/2 pr-[42px]">
                    <TextInput
                      label="Current Price"
                      id="current_price"
                      name="current_price"
                      type="number"
                      className="h-[98px] rounded-[13px] text-[32px]"
                      value={formik.values.current_price}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="w-1/2 pl-[42px]">
                    <TextInput
                      id="quantity"
                      label="Available Quantity"
                      name="quantity"
                      type="number"
                      className="h-[98px] rounded-[13px] text-[32px]"
                      value={formik.values.quantity}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>
                <div className="w-full flex mt-[42px]">
                  <div className="w-1/2 pr-[42px]">
                    <TextInput
                      id="minimum_price"
                      label="Minimum Price"
                      name="minimum_price"
                      type="number"
                      className="h-[98px] rounded-[13px] text-[32px]"
                      value={formik.values.minimum_price}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="w-1/2 pl-[42px]">
                    <TextInput
                      id="maximum_price"
                      label="Maximum Price"
                      name="maximum_price"
                      type="number"
                      className="h-[98px] rounded-[13px] text-[32px]"
                      value={formik.values.maximum_price}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>
                <div className="w-full flex mt-[42px]">
                  <div className="w-1/2 pr-[42px]">
                    <TextInput
                      id="auto_stock_amount"
                      label="Auto Stock Amount"
                      name="auto_stock_amount"
                      type="number"
                      className="h-[98px] rounded-[13px] text-[32px]"
                      value={formik.values.auto_stock_amount}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="w-1/2 pl-[42px]">
                    <TextInput
                      id="price_change_amount"
                      label="Price Change Amount"
                      name="price_change_amount"
                      type="number"
                      className="h-[98px] rounded-[13px] text-[32px]"
                      value={formik.values.price_change_amount}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>
                <div className="w-full flex mt-[42px]">
                  <div className="w-1/2">
                    <TextInput
                      id="auto_quantity_change"
                      label="Auto Quantity Change"
                      name="auto_quantity_change"
                      type="number"
                      className="h-[98px] rounded-[13px] text-[32px]"
                      value={formik.values.auto_quantity_change}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="w-1/2 pl-[42px] mt-[45px]">
                    <Button
                      text="Save"
                      type="submit"
                      className="w-[438px] h-[98px] bg-[#0047FF]"
                    />
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
