import { httpConstants } from "../constants";
import { httpService } from "../utility/httpService";
import { getAccessToken, getHeaders, getUserId } from "./baseFunctions";

export default {
    getSettings
};



async function getSettings(requestData) {
    let url = process.env.REACT_APP_API_URI + `/api/settings`
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
