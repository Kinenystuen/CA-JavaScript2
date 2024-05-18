import { setUpdatePostForm } from "../handlers/update.mjs";
import { clearHTML } from "../utilitis.mjs/clearHTML.mjs";
import { formatDateMMDDYYHT } from "../utilitis.mjs/formatDate.mjs";
import { displayComments } from "./disComments.mjs";
import * as handlers from "./../handlers/index.mjs";
import { removePost } from "../api/posts/remove.mjs";
import { getProfile } from "../api/posts/getProfile.mjs";
import { reactToPost } from "../api/posts/react.mjs";
import { load } from "../storage/load.mjs";

const feedContainer = document.getElementById("feedContainer");
const profileName = document.getElementById("profileName");
const profileBio = document.getElementById("profileBio");
const profileImg = document.getElementById("profileImg");
const followBtn = document.getElementById("followBtn");
const navLinkProfile = document.getElementById("navLinkProfile");
const newPostArea = document.getElementById("newPostArea");
const newPostBtn = document.getElementById("newPostBtn");
const postAvatar = document.getElementById("postAvatar");

export async function displayProfile() {
  const profiles = await getProfile();
  const profile = profiles.data;
  // Set names
  profileName.innerText = profile.name;
  if (profile.bio) {
    profileBio.innerText = profile.bio;
  } else {
    profileBio.innerText = `${profile.name} has been busy chasing squirrels around the neighborhood trying to convince them to ghostwrite their bio. `;
  }
  profileImg.src = profile.avatar.url;

  // Fetch profile data from local storage
  const username = load("profile").name;

  // Change numbers for followers & following
  const followers = document.getElementById("followers");
  const following = document.getElementById("following");
  followers.innerText = profile.followers.length;
  following.innerText = profile.following.length;

  // profile display
  const profileDisplay = document.getElementById("profileDisplay");
  const ddMenuBtn = document.createElement("div");
  const ddMenuBtnI = document.createElement("i");

  // dropdown with trashcan and update post buttons
  const ddMenuUl = document.createElement("ul");
  const ddMenyLiTrash = document.createElement("li");
  const ddMenyLiTrashA = document.createElement("a");
  const trashCan = document.createElement("i");
  const ddMenyLiUpdate = document.createElement("li");
  const ddMenyLiUpdateA = document.createElement("a");
  const updateIcon = document.createElement("i");
  const ddHr = document.createElement("hr");

  // dropdown menu
  ddMenuBtn.classList.add(
    "d-flex",
    "p-3",
    "btn",
    "d-flex",
    "align-items-center",
    "align-self-start",
    "link-body-emphasis",
    "text-decoration-none"
  );
  ddMenuBtn.setAttribute("data-bs-toggle", "dropdown");
  ddMenuBtnI.classList.add("fa-solid", "fa-ellipsis");
  ddMenuBtnI.setAttribute("aria-expanded", "true");
  ddMenuBtnI.id = "ddMenuUlPro";

  ddMenuBtn.appendChild(ddMenuBtnI);

  // Ul menu
  ddMenuUl.classList.add("dropdown-menu", "text-small", "shadow");
  ddMenuUl.setAttribute("aria-labelledby", "ddMenuUlPro");
  ddMenyLiTrashA.classList.add(
    "dropdown-item",
    "dropdown-item-danger",
    "d-flex",
    "gap-2",
    "align-items-center"
  );
  ddMenyLiUpdateA.classList.add(
    "dropdown-item",
    "dropdown-item-danger",
    "d-flex",
    "gap-2",
    "align-items-center"
  );
  ddMenyLiUpdate.setAttribute("data-bs-toggle", "modal");
  ddMenyLiUpdate.setAttribute("data-bs-target", `#updateProfileModal`);
  ddHr.classList.add("m-1");

  const updateProfileModal = document.getElementById("updateProfileModal");
  ddMenyLiUpdate.addEventListener("click", function () {
    updateProfileModal.addEventListener("shown.bs.modal", function () {
      const updPostAvatarProfile = document.getElementById(
        "updPostAvatarProfile"
      );
      updPostAvatarProfile.src = profile.avatar.url;
      const updUsername = document.getElementById("updUsernameInput");
      updUsername.value = profile.name;
      const updBio = document.getElementById("updBioInput");
      updBio.value = profile.bio;
      const updateAvatar = document.getElementById("updAvatarUrlInput");
      updateAvatar.value = profile.avatar.url;
      const btnUpdateProfile = document.getElementById("btnUpdatePost");

      handlers.setUpdateProfileForm();
    });
  });
  ddMenyLiUpdate.appendChild(ddMenyLiUpdateA);
  ddMenyLiTrash.appendChild(ddMenyLiTrashA);

  ddMenuUl.appendChild(ddMenyLiUpdate);

  updateIcon.classList.add("fa-solid", "fa-pen-to-square");
  updateIcon.title = "Edit profile";
  ddMenyLiUpdateA.appendChild(updateIcon);
  ddMenyLiUpdateA.innerHTML += "Edit profile";

  ddMenuBtn.appendChild(ddMenuBtnI);
  ddMenuBtn.appendChild(ddMenuUl);

  function isFollowing(name) {
    for (const user of profile.followers) {
      if (user.name === name) {
        return true;
      }
    }
    return false;
  }  

  if (profile.name === username) {
    profileDisplay.appendChild(ddMenuBtn);
    navLinkProfile.classList.add("active");
    postAvatar.src = profile.avatar.url;
  } else {
    followBtn.classList.remove("visually-hidden");
    navLinkProfile.classList.add("link-body-emphasis");
    if (isFollowing(username)) {
      followBtn.innerText = "Following";
    } else {
      followBtn.innerText = "Follow";
    }
  }
  if (profile.name === username) {
    newPostBtn.style.display = "block";
  } else {
    newPostBtn.style.display = "none";
    newPostArea.classList.remove("p-2", "pt-4", "ps-4", "pe-4");
  }
}

export async function displayProfilePost(posts) {
  clearHTML(feedContainer);
  const postData = posts.data;

  // Fetch profile data from local storage
  const username = load("profile").name;

  // Changes numbers for posts
  const postsLength = document.getElementById("postsLength");

  postsLength.innerText = postData.length;
  let comments = 0;

  postData.forEach((post) => {
    const img = document.createElement("img");

    const card = document.createElement("article");
    card.id = `cardPost-${post.id}`;
    const cardBody = document.createElement("div");
    const postId = post.id;

    // Info bar with avatar, username and date
    const headerBar = document.createElement("div");
    const infoBar = document.createElement("a");
    const authorAvatar = document.createElement("img");
    const info = document.createElement("div");
    const authorName = document.createElement("strong");
    const dateDiv = document.createElement("div");
    const date = document.createElement("small");
    const dateUpd = document.createElement("small");
    const ddMenuBtn = document.createElement("div");
    const ddMenuBtnI = document.createElement("i");

    // dropdown with trashcan and update post buttons
    const ddMenuUl = document.createElement("ul");
    const ddMenyLiTrash = document.createElement("li");
    const ddMenyLiTrashA = document.createElement("a");
    const trashCan = document.createElement("i");
    const ddMenyLiUpdate = document.createElement("li");
    const ddMenyLiUpdateA = document.createElement("a");
    const updateIcon = document.createElement("i");
    const ddHr = document.createElement("hr");

    headerBar.classList.add("d-flex", "justify-content-between")
    card.classList.add("card", "position-relative", "m-4");
    cardBody.classList.add("card-body");
    infoBar.classList.add(
      "d-flex",
      "align-items-center",
      "gap-2",
      "link-body-emphasis",
      "text-decoration-none"
    );

    authorAvatar.classList.add("rounded-circle", "me-2", "object-fit-cover");
    authorAvatar.setAttribute("width", "32");
    authorAvatar.setAttribute("height", "32");

    if (post.author.avatar.url) {
      const img = new Image();
      img.onload = function () {
        authorAvatar.src = this.src;
      };
      img.onerror = function () {
        authorAvatar.src = "../../img/user-solid.svg";
      };
      img.src = post.author.avatar.url;
    }

    info.classList.add("d-flex", "row", "w-100");
    authorName.innerText = post.author.name;
    dateDiv.classList.add("d-flex", "flex-row", "flex-wrap");
    date.classList.add("text-muted", "pe-2");
    dateUpd.classList.add("text-muted", "text-sm");

    const formattedDate = formatDateMMDDYYHT(post.created);
    const formattedDateUpd = formatDateMMDDYYHT(post.updated);
    date.innerText = `${formattedDate}`;
    dateUpd.innerText = `| edited ${formattedDateUpd}`;

    // dropdown menu
    ddMenuBtn.classList.add(
      "d-flex",
      "p-3",
      "btn",
      "d-flex",
      "align-items-center",
      "link-body-emphasis",
      "text-decoration-none"
    );
    ddMenuBtn.setAttribute("data-bs-toggle", "dropdown");
    ddMenuBtn.setAttribute("tabindex", "0");
    ddMenuBtnI.classList.add("fa-solid", "fa-ellipsis");
    ddMenuBtnI.setAttribute("aria-expanded", "true");
    ddMenuBtnI.id = "ddMenuUl";

    ddMenuUl.classList.add(
      "dropdown-menu",
      "dropdown-menu",
      "text-small",
      "shadow"
    );
    ddMenuUl.setAttribute("aria-labelledby", "ddMenuUl");
    ddMenyLiTrashA.classList.add(
      "dropdown-item",
      "dropdown-item-danger",
      "d-flex",
      "gap-2",
      "align-items-center"
    );
    ddMenyLiUpdateA.classList.add(
      "dropdown-item",
      "dropdown-item-danger",
      "d-flex",
      "gap-2",
      "align-items-center"
    );
    // ddMenyLiUpdate.id = `updateBtn-${post.id}`;
    ddMenyLiUpdate.setAttribute("data-bs-toggle", "modal");
    ddMenyLiUpdate.setAttribute("data-bs-target", `#updatePostModal`);
    ddHr.classList.add("m-1");

    const updatePostModal = document.getElementById("updatePostModal");
    ddMenyLiUpdate.addEventListener("click", function () {
      updatePostModal.addEventListener("shown.bs.modal", function () {
        const updPostAvatar = document.getElementById("updPostAvatar");
        updPostAvatar.src = post.author.avatar.url;
        const updateTitle = document.getElementById("updatePostTitleInput");
        updateTitle.value = post.title;
        const updateBody = document.getElementById("updatePostBodyInput");
        updateBody.value = post.body;
        const updateTags = document.getElementById("updatePostTagsInput");
        updateTags.value = post.tags;
        const updateUrl = document.getElementById("updatePostUrlInput");
        updateUrl.value = post.media.url;
        const btnUpdatePost = document.getElementById("btnUpdatePost");

        setUpdatePostForm(postId);
      });
    });

    ddMenyLiUpdate.appendChild(ddMenyLiUpdateA);
    ddMenyLiTrash.appendChild(ddMenyLiTrashA);

    ddMenuUl.appendChild(ddMenyLiUpdate);
    ddMenuUl.appendChild(ddHr);
    ddMenuUl.appendChild(ddMenyLiTrash);

    trashCan.classList.add("fa-solid", "fa-trash");
    trashCan.id = `trashCanBtn-${post.id}`;
    trashCan.title = "Trash post";
    ddMenyLiTrashA.appendChild(trashCan);
    ddMenyLiTrashA.innerHTML += "Trash post";
    // function to delete users post inside dropdown menu
    ddMenyLiTrashA.addEventListener("click", function () {
      const postData = { id: post.id };
      removePost(postData);
    });

    updateIcon.classList.add("fa-solid", "fa-pen-to-square");
    updateIcon.id = `trashCanBtn-${post.id}`;
    updateIcon.title = "Edit post";
    ddMenyLiUpdateA.appendChild(updateIcon);
    ddMenyLiUpdateA.innerHTML += "Edit post";

    ddMenuBtn.appendChild(ddMenuBtnI);
    ddMenuBtn.appendChild(ddMenuUl);

    info.appendChild(authorName);
    dateDiv.appendChild(date);
    if (post.updated !== post.created) {
      dateDiv.appendChild(dateUpd);
    }
    info.appendChild(dateDiv);
    infoBar.appendChild(authorAvatar);
    infoBar.appendChild(info);
    headerBar.appendChild(infoBar)
    if (post.author.name === username) {
      headerBar.appendChild(ddMenuBtn);
    }

    // Post - title and para
    const hrCardBody = document.createElement("hr");
    const postTitle = document.createElement("h5");
    const postP = document.createElement("p");
    const postLink = document.createElement("a");

    postLink.href = `/html/pages/post.html?id=${post.id}`;
    postLink.title = `Go to post`;
    postLink.classList.add(
      "text-black",
      "link-underline",
      "link-underline-opacity-0"
    );
    postTitle.classList.add("card-title");
    postTitle.innerText = post.title;

    postP.classList.add("card-text");
    postP.innerText = post.body;

    // body img
    const imgBody = document.createElement("div");
    imgBody.classList.add(
      "overflow-hidden",
      "d-flex",
      "object-fit-contain",
      "justify-content-center",
      "align-content-center"
    );
    imgBody.id = "imgBody";

    const postImg = document.createElement("img");
    imgBody.appendChild(postImg);
    if (post.media === null || !post.media === "") {
      imgBody.classList.remove("vh-80");
    } else {
      postImg.classList.add(
        "img-fluid",
        "object-fit-cover",
        "min-vh-50",
        "max-vh-80"
      );
      postImg.src = post.media.url;
      postImg.alt = post.media.alt;
    }

    // buttonBar - comment, like, follow
    const cmtBody = document.createElement("div");
    const btnBar = document.createElement("div");
    const btnCmt = document.createElement("button");
    const btnFav = document.createElement("button");
    const btnShare = document.createElement("button");
    const btnFavI = document.createElement("i");
    const btnFavCount = document.createElement("p");
    const btnShareI = document.createElement("i");

    btnBar.classList.add(
      "d-flex",
      "justify-content-center",
      "btn-group",
      "mt-3"
    );
    btnBar.setAttribute("role", "group");
    btnBar.setAttribute("aria-label", "outline");

    comments = post.comments.length;

    btnCmt.classList.add("btn", "btn-outline-primary");
    btnCmt.innerText = `Comments: ${comments}`;
    btnCmt.type = "button";
    btnCmt.id = `btnCmt-${postId}`;
    btnCmt.setAttribute("data-bs-toggle", "collapse");
    btnCmt.setAttribute("data-bs-target", `#showComments-${post.id}`);
    btnCmt.setAttribute("aria-expanded", "false");
    btnCmt.setAttribute("aria-controls", `showComments-${post.id}`);

    btnFav.classList.add(
      "d-flex",
      "btn",
      "btn-outline-primary",
      "justify-content-center",
      "align-items-center",
      "gap-2"
    );
    btnFav.title = "Favorite";
    const reactors = post.reactions.reactors;
    btnFavI.classList.add("fa-regular", "fa-heart");
    
    btnFavCount.classList.add("my-auto");
    btnFavCount.innerText = post.reactions.length;
    btnFav.appendChild(btnFavI);
    btnFav.appendChild(btnFavCount);
   
    btnFavI.title = "Favorite";
    btnFav.addEventListener("click", function () {
      if (btnFavI.classList.contains("fa-regular")) {
        btnFavCount.innerText = parseInt(btnFavCount.innerText) + 1; // Increment the count
      } else {  
        btnFavCount.innerText = parseInt(btnFavCount.innerText) - 1; // Increment the count
      }
      btnFavI.classList.toggle("fa-regular");
      btnFavI.classList.toggle("fa-solid");
      reactToPost(post);
    });

    btnShare.classList.add("btn", "btn-outline-primary");
    btnShare.title = "Share post";
    btnShareI.classList.add("fa-solid", "fa-share");
    btnShare.appendChild(btnShareI);

    btnBar.appendChild(btnCmt);
    btnBar.appendChild(btnFav);
    btnBar.appendChild(btnShare);
    cmtBody.appendChild(btnBar);

    // comments area
    const commentArea = document.createElement("div");
    const commentsDiv = document.createElement("div");
    const commentsP = document.createElement("div");

    commentArea.classList.add("d-flex", "justify-content-center", "row");
    commentsDiv.classList.add("collapse");
    commentsDiv.id = "showComments-" + post.id;
    commentsP.classList.add("card-body", "bg-body-tertiary");
    commentsP.id = `commentArea-${postId}`;

    commentsDiv.appendChild(commentsP);
    commentArea.appendChild(commentsDiv);
    cmtBody.appendChild(commentArea);

    cardBody.appendChild(headerBar);
    cardBody.appendChild(hrCardBody);
    postLink.appendChild(postTitle);
    postLink.appendChild(postP);
    postLink.appendChild(imgBody);
    cardBody.appendChild(postLink);

    card.appendChild(cardBody);
    card.appendChild(cmtBody);

    feedContainer.appendChild(card);

    if (post.comments) {
      displayComments(post, postId);
    }
  });
}
