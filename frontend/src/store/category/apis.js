import { API } from "../../helpers/apiCaller";

export function doGetCategories() {
  return API.get("/categories/", {}).then(function (response) {
    return response;
  });
}

export function doGetCategory(id) {
  return API.get(`/categories/${id}`).then(function (response) {
    return response;
  });
}
