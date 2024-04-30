import { apiHostUrl } from "../constants.mjs"
import { headers } from "../headers.mjs";

export async function userUserProfile() {
    const response = await fetch(`${apiHostUrl}/social/posts`, {
            headers(),
    });
    if (response.ok) {
        return await response.json();
    }
    throw new Error(response.statusText);
}