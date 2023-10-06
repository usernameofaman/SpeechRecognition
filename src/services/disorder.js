import { httpConstants } from "../constants";
import { httpService } from "../utility/httpService";
import { getAccessToken, getHeaders, getUserId } from "./baseFunctions";

export default {
   addDisorder,
   deleteDisorder,
   updateDisorder
};



async function addDisorder(requestData) {
    let url = process.env.REACT_APP_API_URI + `/api/add-disorder/`
    return httpService(httpConstants.METHOD_TYPE.POST, getHeaders(),requestData, url)
        .then(
            response => {
                if (!response)
                    return Promise.reject(response);
                return Promise.resolve(response);
            }
        ).catch(function (err) {
            return Promise.reject(err);
        });
}


async function deleteDisorder(requestData) {
    let url = process.env.REACT_APP_API_URI + `/api/delete-disorder/${requestData._id}`
    return httpService(httpConstants.METHOD_TYPE.DELETE, getHeaders(),requestData, url)
        .then(
            response => {
                if (!response)
                    return Promise.reject(response);
                return Promise.resolve(response);
            }
        ).catch(function (err) {
            return Promise.reject(err);
        });
}


async function updateDisorder(requestData) {
    let url = process.env.REACT_APP_API_URI + `/api/update-disorder/${requestData._id}`
    return httpService(httpConstants.METHOD_TYPE.PUT, getHeaders(),requestData, url)
        .then(
            response => {
                if (!response)
                    return Promise.reject(response);
                return Promise.resolve(response);
            }
        ).catch(function (err) {
            return Promise.reject(err);
        });
}
