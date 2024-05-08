import { createComment } from "../api/posts/createComment.mjs";

export function openCommentForm(post, postId) {
  console.log(postId);
  console.log(post)
  const commentFormArea = document.getElementById(`commentArea-${postId}`);

  // Create form
  const cmtForm = document.createElement("form");
  cmtForm.id = `cmtForm-${postId}`;
  cmtForm.id = `cmtForm`;
  cmtForm.classList.add("mt-3");

  const commentFormGroup = document.createElement("div");
  commentFormGroup.classList.add("form-group");

  const commentLabel = document.createElement("label");
  commentLabel.textContent = "Comment";
  commentLabel.setAttribute("for", "commentInput");

  const commentInput = document.createElement("textarea");
  commentInput.classList.add("form-control");
  commentInput.setAttribute("rows", "3");
  commentInput.id = "commentInput";

  commentFormGroup.appendChild(commentLabel);
  commentFormGroup.appendChild(commentInput);

  const submitBtn = document.createElement("button");
  submitBtn.classList.add("btn", "btn-primary", "mt-2");
  submitBtn.setAttribute("type", "submit");
  submitBtn.textContent = "Submit";
  submitBtn.id = "submitBtn";

  cmtForm.appendChild(commentFormGroup);
  cmtForm.appendChild(submitBtn);

  cmtForm.addEventListener("submit", (event) => {
    event.preventDefault(); 

    const commentElement = document.getElementById("commentInput");
    const commentValue = commentElement.value;
    console.log(commentValue);

    createComment({
                postId: postId,
                body: commentValue,
            })
  });
  
  commentFormArea.appendChild(cmtForm);
}
