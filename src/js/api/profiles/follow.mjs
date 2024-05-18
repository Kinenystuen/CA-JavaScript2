import { apiSocialUrl } from "../constants.mjs";
import { headers } from "../headers.mjs";
import { load } from "../headers.mjs";

const action = "/profiles";
const method = "put";
const token = load("token");

export async function followProfile(profileData) {
  const updateProfileURL = `${apiSocialUrl}${action}/${profileData.name}/follow`;

  try { 
    const apiKey = localStorage.getItem("apiKey");

    // Prepare headers
    const headersData = headers("application/json");
    headersData["Authorization"] = `Bearer ${token}`;
    headersData["X-Noroff-API-Key"] = apiKey;

    const options = {
      method,
      headers: headersData
    };

    const response = await fetch(`${updateProfileURL}`, options);

    if (response.ok) {
      const profile = await response.json();
    //   window.location.reload();
    } else {
      throw new Error(`Failed to edit profile: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error updating profile:", error);
  }
}
