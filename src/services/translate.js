import { httpConstants } from "../constants";
import { httpService } from "../utility/httpService";
import { getAccessToken, getHeaders, getUserId } from "./baseFunctions";

export default {
    getToken,
    // translateAPI
};


async function getToken(requestData) {
    let url = process.env.REACT_APP_API_URI + `/api/translate `
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

// CHECK THIS  


// function getTranslationHeaders() {
//     const accessToken = localStorage.getItem('translationToken'); // Modify the key as per your storage key
  
//     // Ensure that the accessToken is not null or undefined before including it in the headers
//     if (accessToken) {
//       return {
//         "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
//         skip: true,
//         "Access-Control-Allow-Origin": "*",
//         Authorization: `Bearer ${accessToken}`,
//       };
//     } else {
//       // Handle the case when the accessToken is not available in localStorage
//       console.error('Access token not found in localStorage');
//       return {
//         "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
//         skip: true,
//         "Access-Control-Allow-Origin": "*",
//       };
//     }
//   }

// function getTranslationHeaders() {
//     const accessToken = localStorage.getItem('translationToken');
//     return { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON, skip: true, "Access-Control-Allow-Origin": "*", Authorization: `Bearer ${accessToken}`}
//   }

// async function translateAPI(requestData) {
//     let url = 'https://translate.googleapis.com/v3/projects/prj-bootstrap-grnarsoft1:translateText'
//     return httpService(httpConstants.METHOD_TYPE.POST, getTranslationHeaders(), requestData, url)
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
