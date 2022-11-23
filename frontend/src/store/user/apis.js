import { API } from "../../helpers/apiCaller";

export function doGetUsers() {
  return API.get("/users/", {}).then(function (response) {
    return response;
  });
}

export function doGetUser(id) {
  return API.get(`/users/${id}`).then(function (response) {
    return response;
  });
}
