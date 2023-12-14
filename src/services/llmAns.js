import { httpConstants } from "../constants";
import { httpService } from "../utility/httpService";
import { getAccessToken, getHeaders, getUserId } from "./baseFunctions";

export default {
    addLLMQuestionAnswer,
    getLLMQuestionAnswer,
    };

async function getLLMQuestionAnswer(requestData) {
    let url = process.env.REACT_APP_API_URI + `/api/llm-ans`
    return httpService(httpConstants.METHOD_TYPE.GET, getHeaders(), requestData, url)
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

async function addLLMQuestionAnswer(requestData) {
    console.log(requestData);
    let url = process.env.REACT_APP_API_URI + `/api/add-llm-ans`
    return httpService(httpConstants.METHOD_TYPE.POST, getHeaders(), requestData, url)
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


// async function getSettings(requestData) {
//     let url = process.env.REACT_APP_API_URI + `/api/settings`
//     return httpService(httpConstants.METHOD_TYPE.GET, getHeaders(), requestData, url)
//         .then(
//             response => {
//                 if (!response)
//                     return Promise.reject(response);
//                 return Promise.resolve(response);
//             }
//         ).catch(function (err) {
//             return Promise.reject(err);
//         });
// }

// async function updateSettings(requestData) {
//     let url = process.env.REACT_APP_API_URI + `/api/settings`
//     return httpService(httpConstants.METHOD_TYPE.PUT, getHeaders(), requestData, url)
//         .then(
//             response => {
//                 if (!response)
//                     return Promise.reject(response);
//                 return Promise.resolve(response);
//             }
//         ).catch(function (err) {
//             return Promise.reject(err);
//         });
// }


// async function addFreeUsers(requestData) {
//     let url = process.env.REACT_APP_API_URI + `/api/add-free-users`
//     return httpService(httpConstants.METHOD_TYPE.POST, getHeaders(),requestData, url)
//         .then(
//             response => {
//                 if (!response)
//                     return Promise.reject(response);
//                 return Promise.resolve(response);
//             }
//         ).catch(function (err) {
//             return Promise.reject(err);
//         });
// }



// async function getComplaint(requestData) {
//     let url = process.env.REACT_APP_API_URI + `/api/get-complaint`
//     return httpService(httpConstants.METHOD_TYPE.GET, getHeaders(), requestData, url)
//         .then(
//             response => {
//                 if (!response)
//                     return Promise.reject(response);
//                 return Promise.resolve(response);
//             }
//         ).catch(function (err) {
//             return Promise.reject(err);
//         });
// }

// async function setComplaint(requestData) {
//     let url = process.env.REACT_APP_API_URI + `/api/set-complaint`
//     return httpService(httpConstants.METHOD_TYPE.POST, getHeaders(), requestData, url)
//         .then(
//             response => {
//                 if (!response)
//                     return Promise.reject(response);
//                 return Promise.resolve(response);
//             }
//         ).catch(function (err) {
//             return Promise.reject(err);
//         });
// }

// async function getFreeUsers(requestData) {
//     let url = process.env.REACT_APP_API_URI + `/api/get-free-users`
//     return httpService(httpConstants.METHOD_TYPE.GET, getHeaders(),requestData, url)
//         .then(
//             response => {
//                 if (!response)
//                     return Promise.reject(response);
//                 return Promise.resolve(response);
//             }
//         ).catch(function (err) {
//             return Promise.reject(err);
//         });
// }