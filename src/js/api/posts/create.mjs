import { apiSocialUrl } from "../constants.mjs";
import { headers } from "../headers.mjs";
import { load } from "../headers.mjs";
import { clearHTML } from "../../utilitis.mjs/clearHTML.mjs";
import { loaderW } from "../../utilitis.mjs/loader.mjs";

const action = "/posts";
const method = "post";
const token = load("token");

export async function createPost(postData) {
  const createPostURL = `${apiSocialUrl}${action}`;
  console.log(createPostURL);

  const postBtn = document.getElementById("postBtn");
  const errorMessage = document.getElementById("errorMessage");

  clearHTML(postBtn);
  postBtn.appendChild(loaderW);
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

    const response = await fetch(`${createPostURL}`, options);

    if (response.ok) {
      const post = await response.json();
      console.log(post);

      window.location.reload();
    } else {
      postBtn.innerText = "Post";
      postBtn.removeChild(loaderW);
      errorMessage.innerText = `Error creating post: ${response.statusText}`;
      throw new Error(`Failed to create post: ${response.statusText}`);
    }
  } catch (error) {
    errorMessage.innerText = `Error creating post`;
    console.error("Error creating post:", error);
  }
}
