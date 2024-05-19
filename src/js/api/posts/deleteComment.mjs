import { apiSocialUrl } from "../constants.mjs";
import { headers } from "../headers.mjs";
import { load } from "../headers.mjs";
import { createAPIKey } from "../createApiKey.mjs";

const action = "/posts";
const method = "delete";
const token = load("token");

export async function deleteComment(commentData) {
  const commentPostUrl = `${apiSocialUrl}${action}/${commentData.postId}/comment/${commentData.id}`;
  console.log(commentPostUrl);

  try {
    // Create API key
    const { apiKeyData } = await createAPIKey();

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
      const post = await response.json();
      console.log(post);
    } else {
      throw new Error(`Failed to delete comment: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
}
