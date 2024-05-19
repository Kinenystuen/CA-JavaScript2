import { apiSocialUrl } from "../constants.mjs";
import { headers } from "../headers.mjs";
import { load } from "../headers.mjs";
import { createAPIKey } from "../createApiKey.mjs";
import {
  displayProfile,
  displayProfilePost,
} from "../../display/profileDisplay.mjs";

const action = "/profiles";
// const params = "_following=true&_followers=true&_posts=true";
const params = "_posts=true&_author=true&_reactions=true&_comments=true&_following=true&_followers=true";
const method = "get";
const token = load("token");

const queryString = document.location.search;
const urlParams = new URLSearchParams(queryString);
const user = urlParams.get("user");

//
let apiPostUrl;
let apiPostsUrl;

export async function getProfile(postData) {
  if (user) {
    apiPostUrl = `${apiSocialUrl}${action}/${user}?${params}`;
    apiPostsUrl = `${apiSocialUrl}${action}/${user}/posts?${params}`;
  } else {
    const profileData = localStorage.getItem(`profile`);
    const profile = JSON.parse(profileData);
    apiPostUrl = `${apiSocialUrl}${action}/${profile.name}?${params}`;
    apiPostsUrl = `${apiSocialUrl}${action}/${profile.name}/posts?${params}`;
  }
  const getProfileURL = apiPostUrl;

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

    const response = await fetch(`${getProfileURL}`, options);

    if (response.ok) {
      const profiles = await response.json();
    //   displayProfile(profiles);

      return profiles;
    } else {
      throw new Error(`Failed to fetch profile: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
}
export async function getProfilePosts(postData) {
    const userProfile = user;
  if (userProfile) {
    apiPostUrl = `${apiSocialUrl}${action}/${userProfile}?${params}`;
    apiPostsUrl = `${apiSocialUrl}${action}/${userProfile}/posts?${params}`;
  } else {
    const profileData = localStorage.getItem(`profile`);
    const profile = JSON.parse(profileData);
    apiPostUrl = `${apiSocialUrl}${action}/${profile.name}?${params}`;
    apiPostsUrl = `${apiSocialUrl}${action}/${profile.name}/posts?${params}`;
  }
  const getProfilePostsURL = apiPostsUrl;

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

    const response = await fetch(`${getProfilePostsURL}`, options);

    if (response.ok) {
      const posts = await response.json();
      displayProfilePost(posts);

      return;
    } else {
      throw new Error(`Failed to fetch profile: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
}

export async function getYourProfile(postData) {
    const profileData = localStorage.getItem(`profile`);
      const profile = JSON.parse(profileData);
      apiPostUrl = `${apiSocialUrl}${action}/${profile.name}?${params}`;
      apiPostsUrl = `${apiSocialUrl}${action}/${profile.name}/posts?${params}`;
    const getProfileURL = apiPostUrl;
  
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
  
      const response = await fetch(`${getProfileURL}`, options);
  
      if (response.ok) {
        const profiles = await response.json();
      //   displayProfile(profiles);
  
        return profiles;
      } else {
        throw new Error(`Failed to fetch profile: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }