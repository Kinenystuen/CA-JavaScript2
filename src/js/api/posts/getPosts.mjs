import { apiSocialUrl } from "../constants.mjs";
import { headers } from "../headers.mjs";
import { load } from "../headers.mjs";
import { createAPIKey } from "../createApiKey.mjs";
import { isLoggedIn } from "../auth/status.mjs";
import { authFetch } from "../authFetch.mjs";

import { displayFeed } from "../../display/feedDisplay.mjs";
import { displayComments } from "../../display/disComments.mjs";

const action = "/posts";
const params = "_author=true&_reactions=true&_comments=true";
const method = "get";
const token = load("token");
const currentUrl = window.location.href;

let apiPostUrl = `${apiSocialUrl}${action}?${params}`;
const loggedIn = isLoggedIn();

export async function getPosts(postData) {
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
      displayFeed(posts);
      return posts;
    } else {
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error fetching post:", error);
  }
}
export async function getComments(postId) {
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
    };

    const response = await fetch(`${getPostsURL}`, options);

    if (response.ok) {
      const posts = await response.json();
      const postData = posts.data;
      const post = postData.find((post) => post.id === postId);

      if (post) {
        displayComments(post);
      } else {
        console.log("Post with postId not found.");
      }
      return;
    } else {
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error fetching post:", error);
  }
}

// filter by search
export async function searchFunction() {
  const searchInput = document.getElementById("search-input");
  searchInput.onkeyup = async function () {
    if (searchInput.value === "") {
      apiPostUrl = `${apiSocialUrl}${action}?${params}`;
    } else {
      apiPostUrl = `${apiSocialUrl}${action}/search?q=${searchInput.value}&${params}`;
    }
    getPosts();
  };
}
// Filter by tag
export async function filterByTag() {
  const sortListTag = document.getElementById("sortListTag");
  sortListTag.addEventListener("change", function () {
    const selOption = sortListTag.options[sortListTag.selectedIndex].value;

    if (selOption === "") {
      apiPostUrl = `${apiSocialUrl}${action}?${params}`;
    } else {
      apiPostUrl = `${apiSocialUrl}${action}?_tag=${selOption}&${params}`;
    }

    getPosts();
  });
}
if (currentUrl.includes("pages/index")) {
  searchFunction();
  filterByTag();
}
