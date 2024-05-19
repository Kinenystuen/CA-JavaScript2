import { load } from "../headers.mjs";

export const isLoggedIn = () => {
    const token = load("token");
    return token ? Boolean(token) : false;
};

export const getProfile = () => {
    const profileData = load("profile");
    if (profileData) {
        return profileData;
    } else {
        // console.error("Profile data not found in local storage.");
        return null;
    }
};

