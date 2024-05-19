import { apiHostUrl, apiAuth, apiLogin } from "../constants.mjs";
import { headers } from "../headers.mjs";
import { login } from "./login.mjs";
import * as storage from "../../storage/index.mjs";
import { clearHTML } from "../../utilitis.mjs/clearHTML.mjs";

export async function register(
  profile,
  action,
  method
) {
  const actionURL = new URL(action);
  const registerURL = `${apiHostUrl}${actionURL.pathname}`;
  const message = document.getElementById("regErrorMessage");
  const body = JSON.stringify(profile);
  const loginAction = `${apiAuth}${apiLogin}`;

  try {
    const response = await fetch(registerURL, {
      headers: headers("application/json"),
      method,
      body,
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
      clearHTML(message);
      login(profile, loginAction, method);
      return result;
    } else {
      const errorResponse = await response.json();
      const errorMessage = errorResponse.errors[0].message;
      message.innerHTML = errorMessage;
      throw new Error(`Server responded with status ${response.status}`);
    }
  } catch (error) {
    // Display the error message to the user
      if (message.innerHTML === "") {
        message.innerHTML = `An error occured:${error}`;
      }
  }
}
