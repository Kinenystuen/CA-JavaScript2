import { apiSocialUrl } from "../constants.mjs";
import { headers } from "../headers.mjs";
import { load } from "../headers.mjs";
import { createAPIKey } from "../createApiKey.mjs";
import { isLoggedIn } from "../auth/status.mjs";
import { authFetch } from "../authFetch.mjs";

import { displayFeed } from "../../display/feedDisplay.mjs";
import { displayComments } from "../../display/disComments.mjs";
import { getPost } from "./getPost.mjs";
import { clearHTML } from "../../utilitis.mjs/clearHTML.mjs";

const action = "/posts";
const params = "_author=true&_reactions=true&_comments=true";
const method = "get";
const token = load("token");
const currentUrl = window.location.href;

let apiPostUrl = `${apiSocialUrl}${action}?${params}`;

export async function fetchPosts(postData) {
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
      const posts = await response.json();
      return await posts;
    } else {
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error fetching post:", error);
  }
}

export async function sortFuntion() {
  const sortList = document.getElementById("sortList");

  const postsData = await fetchPosts();
  let posts;
  const feedContainer = document.getElementById("feedContainer");
  sortList.addEventListener("change", async () => {
    const selOption = sortList.options[sortList.selectedIndex].value;

    clearHTML(feedContainer);

    if (selOption === "media") {
      posts = postsData.data.filter((post) => post.media && post.media.url);
    } else if (selOption === "noMedia") {
      posts = postsData.data.filter((post) => !post.media || !post.media.url);
    } else {
      // Get all posts
      posts = postsData.data;
    }
    const filteredPostsData = { ...postsData, data: posts };
    displayFeed(filteredPostsData);
  });
}

if (currentUrl.includes("pages/index")) {
  sortFuntion();
}
