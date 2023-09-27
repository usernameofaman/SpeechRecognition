import { sessionManager } from "../managers/sessionManager";
import { cookiesConstants } from "../constants";
import { httpConstants } from "../constants";

export function getHeaders() {
  return { "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON, skip: true, "Access-Control-Allow-Origin": "*", Authorization: `Bearer ${getAccessToken()}` };
}

export function getAccessToken() {
  return sessionManager.getDataFromCookies(cookiesConstants.ACCESS_TOKEN);
}
export function getUserId() {
  return sessionManager.getDataFromCookies(cookiesConstants.USER_ID);
}
