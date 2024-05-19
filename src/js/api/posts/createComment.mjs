import { apiSocialUrl } from "../constants.mjs";
import { headers } from "../headers.mjs";
import { load } from "../headers.mjs";
import { createAPIKey } from "../createApiKey.mjs";
import { displayComments } from "../../display/disComments.mjs";
import { clearHTML } from "../../utilitis.mjs/clearHTML.mjs";
import { getComments, getPosts } from "./getPosts.mjs";
import { loaderW } from "../../utilitis.mjs/loader.mjs";

const action = "/posts";
const method = "post";
const token = load("token");
const currentUrl = window.location.href;

export async function createComment(commentData) {
  const postId = commentData.postId;
  const commentPostUrl = `${apiSocialUrl}${action}/${commentData.postId}/comment`;
  const submitBtn = document.getElementById("submitBtn");
  

  clearHTML(submitBtn);
  submitBtn.appendChild(loaderW);

  try {
    const apiKey = localStorage.getItem("apiKey");

    // Prepare headers
    const headersData = headers("application/json");
    headersData["Authorization"] = `Bearer ${token}`;
    headersData["X-Noroff-API-Key"] = apiKey;

    const options = {
      method,
      headers: headersData,
      body: JSON.stringify(commentData),
    };

    const response = await fetch(commentPostUrl, options);

    if (response.ok) {
      const postResponse = await response.json();
      // Display the updated comments
      const commentArea = document.getElementById(`commentArea-${postId}`);
      clearHTML(commentArea);
      getComments(postId);
    } else {
      submitBtn.innerText = "comment";
      submitBtn.removeChild(loaderW);
      throw new Error(`Failed to create comment: ${response.statusText}`);
    }
  } catch (error) {
    errorMessage.innerText = `Error: ${error}`;
    console.error("Error creating comment:", error);
  }
}
