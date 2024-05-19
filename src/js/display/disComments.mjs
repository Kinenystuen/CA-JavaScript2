import { formatDateMMDDYYHT } from "../utilitis.mjs/formatDate.mjs";
import { displayFeed } from "./feedDisplay.mjs";
import { clearHTML } from "../utilitis.mjs/clearHTML.mjs";
import { getPosts } from "../api/posts/getPosts.mjs";
import * as posts from "../api/posts/index.mjs";
import { getProfile, isLoggedIn } from "../api/auth/status.mjs";
import { openCommentForm } from "./commentForm.mjs";

const userLoggedIn = isLoggedIn();
let username = "User"
if (userLoggedIn) {
  const profileData = getProfile();
  username = profileData.name;
}

export async function displayComments(post, postId) {
  const postID = post.id;
  const commentArea = document.getElementById(`commentArea-${postID}`);
  const btnCmt = document.getElementById(`btnCmt-${post.id}`);
  btnCmt.innerText = `Comments: ${post.comments.length}`;

  post.comments.forEach((comment) => {
    const formattedDate = formatDateMMDDYYHT(comment.created);

    const commentElementArea = document.createElement("div");
    const commentProfile = document.createElement("div");
    const commentUserImg = document.createElement("img");
    const commentProfileText = document.createElement("div");
    const commentUser = document.createElement("strong");
    const commentDate = document.createElement("small");
    const commentReply = document.createElement("i");
    const isReply = comment.id !== 0;
    const ddMenuBtn = document.createElement("div");
    const ddMenuBtnI = document.createElement("i");

    commentElementArea.classList.add("card", "p-2", "m-2");
    commentElementArea.id = "comment-" + comment.id;
    commentProfile.classList.add("d-flex", "align-content-center");
    commentProfileText.classList.add("d-flex", "flex-column", "w-100");
    commentDate.textContent = `${formattedDate}`;
    const commentElement = document.createElement("p");
    commentElement.classList.add("ps-4", "mt-2");
    commentElement.textContent = comment.body;
    commentUserImg.alt = "User avatar";
    commentUserImg.classList.add(
      "rounded-circle",
      "m-2",
      "object-fit-cover",
      "align-content-center",
      "flex-shrink-0"
    );
    commentUserImg.setAttribute("width", "32");
    commentUserImg.setAttribute("height", "32");
    commentReply.classList.add("fa-solid", "fa-reply");
    commentReply.title = "Reply";

    // Find comment author name
    const cmtAuthor = comment.author;
    if (cmtAuthor) {
      commentUser.innerText = comment.author.name;
      commentUserImg.src = comment.author.avatar.url;
      commentUserImg.alt = `User image for ${comment.author.name}`;
    } else {
      commentUser.innerText = "Unknown";
      commentUserImg.alt = `User image for unknown`;
    }
    if (!comment.author.avatar.url) {
      commentUserImg.src = "/../img/user-solid.svg";
      commentUserImg.classList.add("border", "p-1");
      commentUserImg.classList.replace(
        "object-fit-cover",
        "object-fit-contain"
      );
    }
    // dropdown with trashcan post buttons
    const ddMenuUl = document.createElement("ul");
    const ddMenyLiTrash = document.createElement("li");
    const ddMenyLiTrashA = document.createElement("a");
    const trashCan = document.createElement("i");

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

    ddMenyLiTrash.appendChild(ddMenyLiTrashA);

    ddMenuUl.appendChild(ddMenyLiTrash);

    trashCan.classList.add("fa-solid", "fa-trash");
    trashCan.id = `trashCanBtn-${comment.id}`;
    trashCan.title = "Trash post";
    ddMenyLiTrashA.appendChild(trashCan);
    ddMenyLiTrashA.innerHTML += "Trash comment";
    // function to delete users post inside dropdown menu
    ddMenyLiTrashA.addEventListener("click", function () {
      const postData = { postId: comment.postId, id: comment.id };
      posts.deleteComment(postData);
    });

    ddMenuBtn.appendChild(ddMenuBtnI);
    ddMenuBtn.appendChild(ddMenuUl);

    commentProfile.appendChild(commentUserImg);
    commentProfileText.appendChild(commentUser);
    commentProfileText.appendChild(commentDate);
    commentProfile.appendChild(commentProfileText);
    if (comment.author.name === username) {
      // infoBar.appendChild(ddMenuBtn);
      commentProfile.appendChild(ddMenuBtn);
    }
    commentElementArea.appendChild(commentProfile);
    commentElementArea.appendChild(commentElement);

    // Check if there is a parent comment
    if (isReply) {
      const parentId = "commentArea-" + comment.postId;
      const parentCommentDiv = document.getElementById(parentId);
      if (parentCommentDiv) {
        commentElementArea.classList.remove("p-2", "m-2");
        commentElementArea.classList.add("border-top", "ps-4", "pt-1", "m-2");

        parentCommentDiv.appendChild(commentElementArea);
      } else {
        // console.error("Parent comment div not found for comment:", comment);
      }
    } else {
      commentProfile.appendChild(commentReply);
      commentArea.appendChild(commentElementArea);
    }
  });
  const newCmt = document.createElement("button");
  newCmt.classList.add("btn", "btn-outline-primary", "m-2");
  newCmt.id = `NewComment-${post.id}`;
  newCmt.innerHTML = "Comment";
  commentArea.appendChild(newCmt);
  newCmt.addEventListener("click", () => {
    newCmt.style.display = "none";
    openCommentForm(post, postId);
  });
}
