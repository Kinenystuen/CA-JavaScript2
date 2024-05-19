import { reactToPost } from "../api/posts/react.mjs";
import { load } from "../storage/load.mjs";
import { clearHTML } from "../utilitis.mjs/clearHTML.mjs";
import { formatDateMonthDDYYHT } from "../utilitis.mjs/formatDate.mjs";
import { formatDateMMDDYYHT } from "../utilitis.mjs/formatDate.mjs";
import { displayComments } from "./disComments.mjs";

const feedContainer = document.getElementById("feedContainer");

export async function displayPost(posts) {
  // const posts = await getPosts();
  clearHTML(feedContainer);
  const post = posts.data;

  const username = load("profile").name;

  let comments = 0;

  const img = document.createElement("img");
  if (!post.media === null) {
    img.src = post.media.url;
  }

  const card = document.createElement("article");
  card.id = `cardPost-${post.id}`;
  const cardBody = document.createElement("div");
  const postId = post.id;

  // Info bar with avatar, username and date
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

  card.classList.add("card", "position-relative", "m-4");
  cardBody.classList.add("card-body");
  infoBar.classList.add(
    "d-flex",
    "align-items-center",
    "gap-2",
    "link-body-emphasis",
    "text-decoration-none"
  );
  infoBar.href = `/html/pages/profile.html?user=${post.author.name}`;
  infoBar.title = `Go to ${post.author.name} profile`;

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
  if (post.author.name === username) {
    infoBar.appendChild(ddMenuBtn);
  }

  // Post - title and para
  const hrCardBody = document.createElement("hr");
  const postTitle = document.createElement("h5");
  const postP = document.createElement("p");
  const postLink = document.createElement("a");

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
  const btnFavCount = document.createElement("p");
  const btnShare = document.createElement("button");
  const btnFavI = document.createElement("i");
  const btnShareI = document.createElement("i");

  btnBar.classList.add("d-flex", "justify-content-center", "btn-group", "mt-3");
  btnBar.setAttribute("role", "group");
  btnBar.setAttribute("aria-label", "outline");

  comments = post.comments.length;

  btnCmt.classList.add("btn", "btn-outline-primary");
  btnCmt.innerText = `Comments: ${comments}`;
  btnCmt.type = "button";
  btnCmt.id = `btnCmt-${postId}`;

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

  for (const reaction of post.reactions) {
    if (reaction.reactors && reaction.reactors.length > 0) {
      const isReacting = reaction.reactors.some(
        (reactor) => {
          if (reactor === username) {
            
            return true;
          }
        } 
      );
      if (isReacting) {
        btnFavI.classList.remove("fa-regular");
        btnFavI.classList.add("fa-solid");
        break;
      }
    }
  }
  
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
//   commentsDiv.classList.add("collapse");
  commentsDiv.id = "showComments-" + post.id;
  commentsP.classList.add("card-body", "bg-body-tertiary");
  commentsP.id = `commentArea-${postId}`;

  commentsDiv.appendChild(commentsP);
  commentArea.appendChild(commentsDiv);
  cmtBody.appendChild(commentArea);

  cardBody.appendChild(infoBar);
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
}
