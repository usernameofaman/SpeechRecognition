/**
 * Created by Ayush Kulshrestha on 18/09/2019.
 */

import Cookies from "universal-cookie";
import { cookiesConstants } from "../constants";

const cookies = new Cookies();

export const sessionManager = {
  setDataInCookies,
  getDataFromCookies,
  removeDataFromCookies,
};

function setDataInCookies(data, key) {
  localStorage.setItem(key, JSON.stringify(data));
  cookies.set(key, JSON.stringify(data), { path: "/" });
}

function getDataFromCookies(key) {
  // return cookies.get(key)
  if (localStorage.getItem(key)) return JSON.parse(localStorage.getItem(key));
}

function removeDataFromCookies(key) {
  localStorage.removeItem(key);
  // cookies.remove(key);
}
