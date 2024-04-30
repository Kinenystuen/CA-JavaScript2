
import * as storage from "../storage/index.mjs";

export const load = (key) => {
	try {
		return JSON.parse(localStorage.getItem(key));
	} catch {
		return null;
	}
};

export const headers = (contentType) => {
	const token = load("token");
	const headers = {};

	if (contentType) {
		headers["Content-Type"] = contentType;
	}

	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

	return headers;
};