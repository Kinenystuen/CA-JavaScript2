import { getPosts } from "../api/posts/getPosts.mjs";
import { displayFeed } from "./feedDisplay.mjs";

const sortDropDownMenuArea = document.getElementById("sortDropDownMenuArea");
const setTags = new Set();

export async function getTags() {
  const posts = await getPosts();
  const post = posts.data;
  const uniqueTags = new Set();

  post.forEach((post) => {
    if (post.tags && post.tags.length > 0) {
      post.tags.forEach((tag) => uniqueTags.add(tag));
    }
  });

  // Convert the Set to an array
  const allTags = Array.from(uniqueTags);


const tagFilterSelect = document.getElementById("sortListTag");

allTags.forEach(tagObject => {
  const option = document.createElement("option");
  option.classList.add("dropdown-item", "btn", "bg-light","d-flex","justify-item-start", "text-align-start")
  option.value = tagObject;
  option.textContent = tagObject;
  tagFilterSelect.appendChild(option);
});

}
