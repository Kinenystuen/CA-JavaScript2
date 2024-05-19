import { getProfile } from "../api/auth/status.mjs";
import { updatePost } from "../api/posts/update.mjs";
import { isLoggedIn } from "../api/auth/status.mjs";
const updatePostForm = document.getElementById("updatePostForm");

const userLoggedIn = isLoggedIn();
let username = "User"
if (userLoggedIn) {
  const profileData = getProfile();
  username = profileData.name;
}

export function setUpdatePostForm(postId) {
  if (updatePostForm) {
    updatePostForm.addEventListener("submit", (event) => {
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
        id: postId,
      };
      if (url.trim() !== '') {
        postData.media = {
          url,
          alt: `Image uploaded by ${username}`
        };
      }

      // Send data to api
      updatePost(postData);
    });
  }
}
