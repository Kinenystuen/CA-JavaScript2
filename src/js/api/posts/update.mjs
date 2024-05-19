import { apiSocialUrl } from "../constants.mjs";
import { headers } from "../headers.mjs";
import { load } from "../headers.mjs";

const action = "/posts";
const method = "put";
const token = load("token");

export async function updatePost(postData) {
  const updatePostURL = `${apiSocialUrl}${action}/${postData.id}`;

  try { 
    const apiKey = localStorage.getItem("apiKey");

    // Prepare headers
    const headersData = headers("application/json");
    headersData["Authorization"] = `Bearer ${token}`;
    headersData["X-Noroff-API-Key"] = apiKey;

    const options = {
      method,
      headers: headersData,
      body: JSON.stringify(postData),
    };

    const response = await fetch(`${updatePostURL}`, options);

    if (response.ok) {
      const post = await response.json();
      window.location.reload();
    } else {
      throw new Error(`Failed to edit post: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error updating post:", error);
  }
}
