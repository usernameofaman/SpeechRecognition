import { httpConstants } from "../constants";
import { httpService } from "../utility/httpService";
import { getAccessToken, getHeaders, getUserId } from "./baseFunctions";

export default {
    getCorporateData,
    addCorporateUser,
    getCorporateEmployees,
    addCorporateEmployee,
    getCorporateById,
    addCorporateLicense,
    getCorporateEmployeeDetails
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

async function getCorporateById(id) {
    let url = process.env.REACT_APP_API_URI + `/api/corporate/get-corporate-by-id/${id}`
    return httpService(httpConstants.METHOD_TYPE.GET, getHeaders(),{}, url)
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

async function getCorporateEmployees(corporateId) {
    let url = process.env.REACT_APP_API_URI + `/api/corporate/get-corporate-employees/${corporateId}`
    return httpService(httpConstants.METHOD_TYPE.GET, getHeaders(),{}, url)
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

async function addCorporateLicense(requestData) {
    let url = process.env.REACT_APP_API_URI + `/api/corporate/add-corporate-license`
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

async function addCorporateEmployee(requestData) {
    let url = process.env.REACT_APP_API_URI + `/api/corporate/add-corporate-employee`
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


async function getCorporateEmployeeDetails(userId, type) {
    let url = process.env.REACT_APP_API_URI + `/api/user/getUserDetails/?userId=${userId}&type=${type}`
    return httpService(httpConstants.METHOD_TYPE.GET, getHeaders(),{}, url)
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



