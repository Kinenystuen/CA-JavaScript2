import { apiSocialUrl } from "../constants.mjs";
import { headers } from "../headers.mjs";
import { load } from "../headers.mjs";
import { createAPIKey } from "../createApiKey.mjs";

const action = "/posts";
const method = "post";
const token = load("token");

export async function createPost(postData) {
  const createPostURL = `${apiSocialUrl}${action}`;
  console.log(createPostURL);

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

    const response = await fetch(`${createPostURL}`, options);

    if (response.ok) {
      const post = await response.json();
      console.log(post);
    } else {
      throw new Error(`Failed to create post: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error creating post:", error);
  }
}
