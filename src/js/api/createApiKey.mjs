import { apiHostUrl } from "./constants.mjs";
import { headers } from "./headers.mjs";

const method = "post";

export async function createAPIKey(name = "") {
    const apiKeyURL = `${apiHostUrl}/auth/create-api-key`;

  try {
    const response = await fetch(apiKeyURL, {
        method,
        headers: headers("application/json"),
        body: JSON.stringify({ name: "apiKey" }),
      });

    if (response.ok) {
      const apiKeyData = await response.json();
      const apiKey = apiKeyData.data.key;
      return { apiKeyData, apiKey }
    } else {

      throw new Error(`Failed to create API key: ${response.status}`);
    }
  } catch (error) {
    console.error("Error creating API key:", error);
    throw error;
  }
}
