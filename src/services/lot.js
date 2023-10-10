import { httpConstants } from "../constants";
import { httpService } from "../utility/httpService";
import { getAccessToken, getHeaders, getUserId } from "./baseFunctions";

export default {
  addLot,
  updateLot,
  deleteLot,
};

async function addLot(requestData) {
  let url = process.env.REACT_APP_API_URI + `/api/add-lot`;
  return httpService(
    httpConstants.METHOD_TYPE.POST,
    getHeaders(),
    requestData,
    url
  )
    .then((response) => {
      if (!response) return Promise.reject(response);
      return Promise.resolve(response);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

async function deleteLot(requestData) {
  let url =
    process.env.REACT_APP_API_URI + `/api/delete-lot/${requestData._id}`;
  return httpService(
    httpConstants.METHOD_TYPE.DELETE,
    getHeaders(),
    requestData,
    url
  )
    .then((response) => {
      if (!response) return Promise.reject(response);
      return Promise.resolve(response);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

async function updateLot(requestData) {
  let url =
    process.env.REACT_APP_API_URI + `/api/update-lot/${requestData._id}`;
  return httpService(
    httpConstants.METHOD_TYPE.PUT,
    getHeaders(),
    requestData,
    url
  )
    .then((response) => {
      if (!response) return Promise.reject(response);
      return Promise.resolve(response);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}
