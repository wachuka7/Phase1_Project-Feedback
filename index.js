document.addEventListener("DOMContentLoaded", function () {
  const commentsList = document.getElementById("comments-list");

  fetch("http://localhost:3000/comments")
    .then((response) => response.json())
    .then((comments) => {
      // All the comments are displayed from the db.json
      comments.forEach((comment) => {
        const commentContainer = document.createElement("div");
        commentContainer.classList.add("comment-container");
        const commentElement = document.createElement("p");
        commentElement.textContent = comment.body;
        const userDetails = document.createElement("div");
        userDetails.classList.add("comment-container");


        commentContainer.appendChild(commentElement);
        commentContainer.appendChild(userDetails)
        commentsList.appendChild(commentContainer);

        //when clicked, the comment displays the buttons and turns grey
        commentElement.addEventListener("click", () =>
          toggleComment(commentContainer, comment)
        );
      });
    });
});

function toggleComment(commentContainer, comment) {
  // the function make the comment turn grey
  commentContainer.classList.toggle("clicked");
  // the toggle comment function makes the buttons appear and disappear
  const buttons = commentContainer.querySelector(".options");
  const buttonsVisible = buttons && buttons.classList.contains("show");

  // Show or hide options based on the visibility of buttons
  if (buttonsVisible) {
    hideButtons(commentContainer);
  } else {
    showButtons(commentContainer, comment);
  }
}

function showButtons(commentContainer, comment,userDetails) {
  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("options");

  const likeButton = document.createElement("button");
  likeButton.textContent = "Like";
  likeButton.addEventListener("click", (event) =>
    likeComment(likeButton, event)
  );

  const seeUserDetailsButton = document.createElement("button");
seeUserDetailsButton.textContent = "See Details";
seeUserDetailsButton.addEventListener("click", function handleClick() {
  showUserDetails(comment, commentContainer, userDetails);

  // Remove the click event listener
  seeUserDetailsButton.removeEventListener("click", handleClick);

  // Apply styles to make the button transparent and unclickable
  seeUserDetailsButton.style.opacity = "0.5";
  seeUserDetailsButton.style.pointerEvents = "none";
});

  const replyInput = document.createElement("input");
  replyInput.type = "text";
  replyInput.placeholder = "Add a reply...";
  replyInput.classList.add("reply-input");

  const replyButton = document.createElement("button");
  replyButton.textContent = "Reply";
  replyButton.addEventListener("click", () =>
    toggleReply(replyInput, commentContainer)
  );

  const optionsButton = document.createElement("button");
  optionsButton.textContent = "Options";
  optionsButton.addEventListener("click", () => toggleOptions(optionsDiv));

  const optionsDiv = document.createElement("div");
  optionsDiv.classList.add("options");

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", (event) => {
    event.stopPropagation();
    deleteComment(commentContainer);
  });

  const markAsReadButton = document.createElement("button");
  markAsReadButton.textContent = "Mark as Read";
  markAsReadButton.addEventListener("click", (event) => {
    event.stopPropagation();
    markAsRead(commentContainer);
  });

  deleteButton.classList.add("show");
  markAsReadButton.classList.add("show");

  optionsDiv.appendChild(deleteButton);
  optionsDiv.appendChild(markAsReadButton);

  buttonsDiv.appendChild(likeButton);
  buttonsDiv.appendChild(seeUserDetailsButton);
  buttonsDiv.appendChild(replyButton);
  buttonsDiv.appendChild(optionsButton);
  buttonsDiv.appendChild(optionsDiv);
  commentContainer.appendChild(buttonsDiv);
  commentContainer.appendChild(replyInput);

  buttonsDiv.classList.add("show");
}

function hideButtons(commentContainer) {
  // Find and remove the options div from the comment container
  const buttonsDiv = commentContainer.querySelector(".options");
  buttonsDiv.remove();
}


function showUserDetails(comment,userDetails) {

  const nameElement = document.createElement("p");
  nameElement.textContent = comment.name;
  const emailElement = document.createElement("p");
  emailElement.textContent = comment.email;
  const phoneElement = document.createElement("p");
  phoneElement.textContent = comment.phone;

  userDetails.appendChild(nameElement);
  userDetails.appendChild(emailElement);
  userDetails.appendChild(phoneElement);
  userDetails.classList.add("show");

}

  

function likeComment(button, event) {
  // Toggle the 'liked' class on the button
  button.classList.toggle("liked");

  // Stop the event from propagating to prevent clicking the comment triggering this event
  event.stopPropagation();
}
function toggleReply(replyInput, commentContainer) {
  replyInput.classList.toggle("show");

  // Check if the input is visible, then focus on it
  if (replyInput.classList.contains("show")) {
    replyInput.focus();
  } else {
    // If the input is hidden, process the submitted reply
    const replyText = replyInput.value.trim();

    if (replyText !== "") {
      const replyElement = document.createElement("p");
      replyElement.textContent = replyText;
      replyElement.classList.add("reply-text");

      // Append the reply below the comment
      commentContainer.appendChild(replyElement);

      // Clear the input field after adding a reply
      replyInput.value = "";
    }
  }
}

function toggleOptions(optionsDiv) {
  optionsDiv.classList.toggle("show");
  
}
function hideReplies(commentContainer) {
    // Find and remove reply elements from the comment container
    const replyElements = commentContainer.querySelectorAll('.reply-text');
    replyElements.forEach(replyElement => replyElement.remove());
}
function deleteComment(commentContainer, event) {
  const confirmDelete = confirm("Do you want to delete this comment?");

  if (confirmDelete) {
    commentContainer.remove();
  }
}
function markAsRead(commentContainer) {
  const commentText = commentContainer.querySelector("p");
  commentText.classList.add("read-comment");
}
