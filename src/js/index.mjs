import { isLoggedIn } from "./api/auth/status.mjs";
import * as posts from "./api/posts/index.mjs";
import * as handlers from "./handlers/index.mjs";
import * as evtListener from "./evtListners/index.mjs";

import { displayFeed } from "./display/feedDisplay.mjs";
import { loadProfile } from "./api/profiles/user.mjs";
import { displayProfile } from "./display/profileDisplay.mjs";
import { displayFollowers } from "./display/followersDis.mjs";
import { displayFollowing } from "./display/followingDis.mjs";
import { getTags } from "./display/disTags.mjs";



const path = location.pathname;
const currentUrl = window.location.href;
// handlers.setLoginForm();

if (path.includes(`/auth/login`)) {
  handlers.setLoginForm();
}
if (path.includes(`/auth/register`) || path === `/html/auth/register.html`) {
  handlers.setRegisterForm();
}

document.addEventListener("DOMContentLoaded", () => {
  if (currentUrl.includes(`pages/index`) || currentUrl.includes(`html/pages/`)) {
    posts.getPosts();
    loadProfile();
    posts.fetchPosts();
    handlers.setCreatePostForm();
    getTags();
  }
  if (currentUrl.includes(`pages/post`)) {
    posts.getPost();
    loadProfile();
  }
  if (currentUrl.includes(`pages/profile`)) {
    displayProfile();
    posts.getProfilePosts();
    loadProfile();
    displayFollowers();
    displayFollowing();
    handlers.followFunction();
    handlers.setCreatePostForm();

  }
  const userLoggedIn = isLoggedIn();
    if (userLoggedIn) {
        handlers.setLogOut();
      } else {
        console.log("User is not logged in");
      }
});