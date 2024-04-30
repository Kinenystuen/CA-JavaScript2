import { apiHostUrl, apiSocial } from "../constants.mjs"
import { headers } from "../headers.mjs";

export async function userUserProfile() {
    const response = await fetch(`${apiHostUrl}${apiSocial}`, {
            headers(),
    });
    if (response.ok) {
        return await response.json();
    }
    throw new Error(response.statusText);
}