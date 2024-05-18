import { getProfile, isLoggedIn } from "../api/auth/status.mjs";
import { createPost } from "../api/posts/create.mjs";
const createPostForm = document.getElementById("createPostForm");

const userLoggedIn = isLoggedIn();
let username = "User";
if (userLoggedIn) {
  const profileData = getProfile();
  username = profileData.name;
}

export function setCreatePostForm() {
  if (createPostForm) {
    createPostForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);

      const tagsInputValue = formData.get("tags");
      const url = formData.get("url");

      // Split the tags input value into an array of tags
      const tagsArray = tagsInputValue.split(",").map((tag) => tag.trim());

      const postData = {
        title: formData.get("title"),
        body: formData.get("body"),
        tags: tagsArray,
      };
      if (url.trim() !== '') {
        postData.media = {
          url,
          alt: `Image uploaded by ${username}`
        };
      }

      // Send data to api
      createPost(postData);
    });
  }
}
