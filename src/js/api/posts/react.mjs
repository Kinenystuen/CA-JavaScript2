import { apiSocialUrl } from "../constants.mjs";
import { headers } from "../headers.mjs";
import { load } from "../headers.mjs";

const action = "/posts";
const method = "put";
const token = load("token");
const reaction = "❤️";

export async function reactToPost(postData) {
    if (!postData.id) {
		throw new Error("No post ID provided");
	}
  const reactPostURL = `${apiSocialUrl}${action}/${postData.id}/react/${reaction}`;

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

    const response = await fetch(`${reactPostURL}`, options);

    if (response.ok) {
    //   window.location.reload();
    } else {
      throw new Error(`Failed to favorite post: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error favoriting post:", error);
  }
}
