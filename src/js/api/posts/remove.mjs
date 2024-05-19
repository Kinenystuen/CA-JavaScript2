import { apiSocialUrl } from "../constants.mjs";
import { headers } from "../headers.mjs";
import { load } from "../headers.mjs";
import { createAPIKey } from "../createApiKey.mjs";

const action = "/posts";
const method = "delete";
const token = load("token");

export async function removePost(postData) {
  const removePostURL = `${apiSocialUrl}${action}/${postData.id}`;
  console.log(removePostURL);
  console.log(postData);

  try { 
    // Create API key
    const { apiKeyData } = await createAPIKey();
    console.log("API Key Data:", apiKeyData.data.key);

    // Prepare headers
    const headersData = headers("application/json");
    headersData["Authorization"] = `Bearer ${token}`;
    headersData["X-Noroff-API-Key"] = apiKeyData.data.key;

    const options = {
      method,
      headers: headersData,
      body: JSON.stringify(postData),
    };

    const response = await fetch(`${removePostURL}`, options);

    if (response.ok) {
      const post = await response.json();
      console.log(post);
    } else {
      throw new Error(`Failed to remove post: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error removing post:", error);
  }
}