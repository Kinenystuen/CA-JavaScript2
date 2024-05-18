import { apiSocialUrl } from "../constants.mjs";
import { headers } from "../headers.mjs";
import { load } from "../headers.mjs";
import { createAPIKey } from "../createApiKey.mjs";
import { displayPost } from "../../display/postDisplay.mjs";

const action = "/posts";
const params = "_author=true&_reactions=true&_comments=true";
const method = "get";
const token = load("token");

const queryString = document.location.search;
const urlParams = new URLSearchParams(queryString);
const postId = urlParams.get("id");

let apiPostUrl = `${apiSocialUrl}${action}/${postId}?${params}`;


export async function getPost(postData) {
  const getPostsURL = apiPostUrl;

  try {
    let apiKey = localStorage.getItem("apiKey");
    // If Api key is not in local storage, create API key
    if (!apiKey) {
      const { apiKeyData } = await createAPIKey();
      apiKey = apiKeyData.data.key;
    } 

    // Prepare headers
    const headersData = headers("application/json");
    headersData["Authorization"] = `Bearer ${token}`;
    headersData["X-Noroff-API-Key"] = apiKey;

    const options = {
      method,
      headers: headersData,
      body: JSON.stringify(postData),
    };

    const response = await fetch(`${getPostsURL}`, options);

    if (response.ok) {
      const post = await response.json();
      displayPost(post);
      return;
    } else {
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error fetching post:", error);
  }
}
