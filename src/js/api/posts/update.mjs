import { apiSocialUrl } from "../constants.mjs";
import { headers } from "../headers.mjs";
import { load } from "../headers.mjs";
import { createAPIKey } from "../createApiKey.mjs";

const action = "/posts";
const method = "put";
const token = load("token");

export async function updatePost(postData) {
  const updatePostURL = `${apiSocialUrl}${action}/${postData.id}`;
  console.log(updatePostURL);
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

    const response = await fetch(`${updatePostURL}`, options);

    if (response.ok) {
      const post = await response.json();
      console.log(post);
    } else {
      throw new Error(`Failed to update post: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error updating post:", error);
  }
}
