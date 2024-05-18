import { getYourProfile } from "../posts/getProfile.mjs";

export async function loadProfile() {
  const profiles = await getYourProfile();
  const profile = profiles.data;

  // Set profile
  const userImg = document.getElementById("userImg");
  const username = document.getElementById("username");

  userImg.src = profile.avatar.url;
  username.innerText = profile.name;

  const newPostAvatar = document.getElementById("newPostAvatarUrl");
  
  if (newPostAvatar) {
    newPostAvatar.src = profile.avatar.url;
  }
}
