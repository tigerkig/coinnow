import { API } from "../../helpers/apiCaller";

export function doGetProducts() {
  return API.get("/products/", {}).then(function (response) {
    return response;
  });
}

export function doGetProduct(id) {
  return API.get(`/products/${id}`).then(function (response) {
    return response;
  });
}
