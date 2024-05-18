import { createComment } from "../api/posts/createComment.mjs";

export async function openCommentForm(post) {
    const postId = post.id;
    const commentFormArea = document.getElementById(`commentArea-${post.id}`);

    // Create form
    const cmtForm = document.createElement("form");
    cmtForm.id = `cmtForm-${post.id}`;
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
    commentInput.required = true;

    commentFormGroup.appendChild(commentLabel);
    commentFormGroup.appendChild(commentInput);

    const submitBtn = document.createElement("button");
    submitBtn.classList.add("btn", "btn-primary", "mt-2");
    submitBtn.setAttribute("type", "submit");
    submitBtn.textContent = "Submit";
    submitBtn.id = "submitBtn";

    cmtForm.appendChild(commentFormGroup);
    cmtForm.appendChild(submitBtn);

    commentFormArea.appendChild(cmtForm);
    handleComment(postId, cmtForm);
}

export function handleComment(postId, cmtForm) {
    cmtForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const commentElement = document.getElementById("commentInput");
        const commentValue = commentElement.value;

        try {
            // Call createComment function to submit the comment
            await createComment({
                postId: postId,
                body: commentValue,
            });
        } catch (error) {
            console.error("Error creating comment:", error);
        }
    });
}
