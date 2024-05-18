import { apiSocialUrl } from "../constants.mjs";
import { headers } from "../headers.mjs";
import { load } from "../headers.mjs";
import { createAPIKey } from "../createApiKey.mjs";

const action = "/posts";
const method = "delete";
const token = load("token");

export async function removePost(postData) {
  const removePostURL = `${apiSocialUrl}${action}/${postData.id}`;

  try { 
    const apiKey = localStorage.getItem("apiKey");

    // Prepare headers
    const headersData = headers("application/json");
    headersData["Authorization"] = `Bearer ${token}`;
    headersData["X-Noroff-API-Key"] = apiKey;

    const options = {
      method,
      headers: headersData,
      body: JSON.stringify(postData),
    };

    const response = await fetch(removePostURL, options);

    if (response.ok) {
      const responseData = await response.text();
      if (responseData.trim() === '') {
        window.location.reload();
        return {};
      } else {
        window.location.reload();
        return JSON.parse(responseData);
      }
    } else {
      throw new Error(`Failed to remove post: ${response.statusText}`);
    }
  } catch (error) {
    throw error;
  }
}
