
import { httpConstants } from "../constants";
import { getAccessToken, getHeaders, getUserId } from "./baseFunctions";
import axios from "axios";

export default {
    fileUpload
};


async function fileUpload(requestData) {
    let url = `${process.env.REACT_APP_API_URI}misc/${getUserId()}/uploadToS3?access_token=${getAccessToken()}`;
    try {
      const response = await axios({
        method: "post",
        url: url,
        data: requestData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response;
    } catch(error) {
      console.log(error)
    }
}