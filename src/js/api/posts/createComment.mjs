import { apiSocialUrl } from "../constants.mjs";
import { headers } from "../headers.mjs";
import { load } from "../headers.mjs";
import { createAPIKey } from "../createApiKey.mjs";
import { displayComments } from "../../display/disComments.mjs";
import { clearHTML } from "../../utilitis.mjs/clearHTML.mjs";
import { getPosts } from "./getPosts.mjs";

const action = "/posts";
const method = "post";
const token = load("token");

export async function createComment(commentData) {
  //   console.log(`Tester ${post.title}`);
  //   console.log(post)
  const postId = commentData.postId;
  console.log(`Is postId working ${postId}`);
  const commentPostUrl = `${apiSocialUrl}${action}/${commentData.postId}/comment`;
  console.log(commentPostUrl);

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
      body: JSON.stringify(commentData),
    };

    const response = await fetch(`${commentPostUrl}`, options);

    if (response.ok) {
      const postResponse = await response.json();
      console.log(postResponse);

      // Display the updated comments
      const commentArea = document.getElementById(`commentArea-${postId}`);
      clearHTML(commentArea);

      // fetch getPosts again to update the comments
      const posts = await getPosts();
      console.log(posts);
      const postsData = posts.data;
      postsData.forEach((post) => {
        displayComments(post, post.id);
      });
    } else {
      throw new Error(`Failed to create comment: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error creating comment:", error);
  }
}
