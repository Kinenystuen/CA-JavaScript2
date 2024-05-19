import { profile } from "../auth/status.mjs";
import { apiHostUrl } from "../constants.mjs";

export function fetchProfile() {
  const profileData = localStorage.getItem("profile");
  if (profileData) {
    return JSON.parse(profileData);
  } else {
    return null; // or handle the case where the profile data is not found
  }
}

export function loadProfile() {
  const profile = fetchProfile();
  if (profile) {
    const username = document.getElementById("username");
    const userImg = document.getElementById("userImg");

    username.innerText = profile.name;
    userImg.src = profile.avatar.url;
    userImg.alt = profile.avatar.alt;

  } else {
    console.log("Profile data not found in local storage.");
  }
}

export async function userUserProfile() {
  // const response = await fetch(${apiHostUrl})
}
