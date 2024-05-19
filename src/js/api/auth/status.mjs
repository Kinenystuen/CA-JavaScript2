import { load } from "../headers.mjs";

export const isLoggedIn = () => {
    const token = load("token");
    return Boolean(token);
};

export const profile = () => load("profile");   

