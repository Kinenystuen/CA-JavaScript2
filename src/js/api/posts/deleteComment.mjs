import { apiSocialUrl } from "../constants.mjs";
import { headers } from "../headers.mjs";
import { load } from "../headers.mjs";
import { getComments, getPosts } from "./getPosts.mjs";
import { clearHTML } from "../../utilitis.mjs/clearHTML.mjs";

const action = "/posts";
const method = "delete";
const token = load("token");

export async function deleteComment(commentData) {
  const postId = commentData.postId;
  const commentPostUrl = `${apiSocialUrl}${action}/${postId}/comment/${commentData.id}`;

  const commentArea = document.getElementById(`comment-${postId}`);
  try {
    // Create API key
    const apiKey = localStorage.getItem("apiKey");

    // Prepare headers
    const headersData = headers("application/json");
    headersData["Authorization"] = `Bearer ${token}`;
    headersData["X-Noroff-API-Key"] = apiKey;

    const options = {
      method,
      headers: headersData,
    };

    const response = await fetch(commentPostUrl, options);

    if (response.ok) {
      // Clear comment area
      const commentArea = document.getElementById(`commentArea-${commentData.postId}`);
      clearHTML(commentArea);

      getComments(postId);
    } else {
      throw new Error(`Failed to delete comment: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
}
