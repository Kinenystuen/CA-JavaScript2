import { headers } from "./headers.mjs";

export async function authFetch(url, options = {}) {
    
	return fetch(url, {
		...options,
	})
		.then((response) => {
			if (!response.ok) {
				return response.json().then((err) => {
					throw new Error(JSON.stringify(err.errors, null, 2));
				});
			}
			return response;
		})
		.catch((error) => {
			throw error;
		});
}