import { httpConstants } from "../constants";
import { httpService } from "../utility/httpService";
import { getAccessToken, getHeaders, getUserId } from "./baseFunctions";

export default {
    getCorporateData,
    addCorporateUser
};


async function getCorporateData(requestData) {
    let url = process.env.REACT_APP_API_URI + `/api/corporate/get-corporate-data`
    return httpService(httpConstants.METHOD_TYPE.GET, getHeaders(),requestData, url)
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

async function addCorporateUser(requestData) {
    let url = process.env.REACT_APP_API_URI + `/api/corporate/add-corporate-data`
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



