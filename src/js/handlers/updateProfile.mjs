import { updateProfile } from "../api/posts/updateProfile.mjs";
const updateProfileForm = document.getElementById("updateProfileForm");

const profileData = localStorage.getItem(`profile`);
const userData = JSON.parse(profileData);
let username = "User";
if (userData) username = userData.name;

export function setUpdateProfileForm() {
  if (updateProfileForm) {
    updateProfileForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);

      const url = formData.get("avatarUrl");

      const profileData = {
        username: formData.get("username"),
        bio: formData.get("bio"),
      };
      if (url.trim() !== "") {
        profileData.avatar = {
          url,
          alt: `Avatar img by ${username}`,
        };
      }

      // Send new data to api
      updateProfile(profileData);
    });
  }
}
