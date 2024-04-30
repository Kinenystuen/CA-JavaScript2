import { apiHostUrl, apiAuth, apiRegister } from "../constants.mjs";
import { headers } from "../headers.mjs";
import * as storage from "../../storage/index.mjs";
import { clearHTML } from "../../utilitis.mjs/clearHTML.mjs";

export async function register(
  profile,
  email,
  name,
  password,
  avatar,
  banner,
  action,
  method
) {
  const actionURL = new URL(action);
  const registerURL = `${apiHostUrl}${actionURL.pathname}`;
  const message = document.getElementById("regErrorMessage");
  const body = JSON.stringify(profile);

  try {
    const response = await fetch(registerURL, {
      // headers: {
      //   "Content-Type": "application/json",
      // },
      headers: headers("application/json"),

      method,
      body,
      // body: JSON.stringify({email, name, password, avatar, banner})
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
      clearHTML(message);
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
