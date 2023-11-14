import { httpConstants } from "../constants";
import { httpService } from "../utility/httpService";
import { getAccessToken, getHeaders, getUserId } from "./baseFunctions";

export default {
    registerNewUser,
    loginUser
};


async function registerNewUser(requestData) {
    let url = process.env.REACT_APP_API_URI + `/api/user/register`
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

async function loginUser(requestData) {
    let url = process.env.REACT_APP_API_URI + `/api/user/login`
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



