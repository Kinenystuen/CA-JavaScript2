import { apiSocialUrl } from "../constants.mjs";
import { headers } from "../headers.mjs";
import { load } from "../headers.mjs";
import { createAPIKey } from "../createApiKey.mjs";

import { displayFeed } from "../../display/feedDisplay.mjs";

const action = "/posts?_author=true&_reactions=true&_comments=true";
const method = "get";
const token = load("token");

export async function getPosts(postData) {
  const getPostsURL = `${apiSocialUrl}${action}`;

  try {
    // Create API key
    const { apiKeyData } = await createAPIKey();
    // console.log("API Key Data:", apiKeyData.data.key);

    // Prepare headers
    const headersData = headers("application/json");
    headersData["Authorization"] = `Bearer ${token}`;
    headersData["X-Noroff-API-Key"] = apiKeyData.data.key;

    const options = {
      method,
      headers: headersData,
      body: JSON.stringify(postData),
    };

    const response = await fetch(`${getPostsURL}`, options);

    if (response.ok) {
      const posts = await response.json();
      return posts;
    } else {
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error fetching post:", error);
  }
}
