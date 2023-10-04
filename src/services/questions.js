import { httpConstants } from "../constants";
import { httpService } from "../utility/httpService";
import { getAccessToken, getHeaders, getUserId } from "./baseFunctions";

export default {
    getQuestions,
    getAllQuestionsData,
    getAllDisorderData,
    getAllLots,
    updateQuestion,
    addQuestion,
    deleteQuestion
};


async function getQuestions(requestData) {
    let url = process.env.REACT_APP_API_URI + "/api/submit-answers"; 
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

async function getAllQuestionsData(requestData) {
    let url = process.env.REACT_APP_API_URI + "/api/AllQuestions"; 
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

async function getAllLots(requestData) {
    let url = process.env.REACT_APP_API_URI + "/api/all-lots"; 
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

async function getAllDisorderData(requestData) {
    let url = process.env.REACT_APP_API_URI + "/api/all-disorder"
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

async function updateQuestion(requestData) {
    let url = process.env.REACT_APP_API_URI + `/api/updateQuestion/${requestData._id}`
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


async function addQuestion(requestData) {
    let url = process.env.REACT_APP_API_URI + `/api/add-question`
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

async function deleteQuestion(requestData) {
    let url = process.env.REACT_APP_API_URI + `/api/delete-question/${requestData._id}`
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