import { apiHostUrl, apiAuth, apiLogin } from "../constants.mjs";
import { headers } from "../headers.mjs";
import * as storage from "../../storage/index.mjs";
import { save } from "../../storage/index.mjs";
import { clearHTML } from "../../utilitis.mjs/clearHTML.mjs";
import { loader, loaderW } from "../../utilitis.mjs/loader.mjs";

// const method = "post";
const message = document.getElementById("regErrorMessage");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
let loginURL;

let isLoggedIn = false;
let newUser = false;

export async function login(profile, action, method) {
  if (action !== "/auth/login") {
    const actionURL = new URL(action);
    loginURL = `${apiHostUrl}${actionURL.pathname}`;
  } else {
    loginURL = `${apiHostUrl}${action}`;
    newUser = true;
  }
  console.log(loginURL);
  const message = document.getElementById("regErrorMessage");

  if (loginBtn) {
    clearHTML(loginBtn);
    loginBtn.appendChild(loaderW);
  }
  if (registerBtn) {
    clearHTML(registerBtn);
    registerBtn.appendChild(loaderW);
  }

  console.log(loginURL);
  const body = JSON.stringify(profile);

  try {
    const response = await fetch(loginURL, {
      headers: headers("application/json"),
      method,
      body,
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      const { accessToken, ...user } = data.data;
      // Save token and user profile to local storage
      save("token", accessToken);
      save("profile", user);
      clearHTML(message);
      isLoggedIn = true;
      window.location.href = "/html/pages/index.html";
      return user;
    } else {
      const errorResponse = await response.json();
      const errorMessage = errorResponse.errors[0].message;
      message.innerHTML = errorMessage;
      if (loginBtn) {
        loginBtn.innerHTML = "Log in";
        loginBtn.removeChild(loaderW);
      }
      if (registerBtn) {
        registerBtn.innerHTML = "Register";
        registerBtn.removeChild(loader);
      }

      throw new Error(`Server responded with status ${response.status}`);
    }
  } catch (error) {
    // display the error to the user
    if (message.innerHTML === "") {
      message.innerHTML = error;
    }
    console.error(error);
  }
}
export { isLoggedIn };
