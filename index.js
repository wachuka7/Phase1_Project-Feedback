document.addEventListener('DOMContentLoaded', function () {
  const commentsIcon = document.querySelector('.comments-icon');
  const commentsList = document.querySelector("#comments-list");

  // Initially hide comments
  commentsList.style.display = 'none';

  commentsIcon.addEventListener('click', () => {
    // Toggle the display of comments when the icon is clicked
    commentsList.style.display = commentsList.style.display === 'none' ? 'block' : 'none';
  });
});
const commentsList = document.querySelector("#comments-list");
const commentInput = document.getElementById("comment-input");
const commentForm = document.getElementById("comment-form");

// Event listener for form submission
commentForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission behavior

  const newCommentText = commentInput.value.trim();
  if (newCommentText !== "") {
    // Create a new comment object to send to the server
    const newComment = {
      body: newCommentText,
    };
    // Post the new comment to the server
    fetch("http://localhost:3000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((createdComment) => {
        // Add the new comment to the UI at the top
        const commentContainer = createCommentElement(createdComment);
        commentsList.append(commentContainer);

        // Clear the input field after adding a comment
        commentInput.value = "";
      })
      .catch((error) => {
        console.error("Error posting comment:", error.message);
        // Display an error message to the user
        alert("Error posting comment. Please try again later.");
      });
  }
});

// Fetch existing comments and display them
fetch("http://localhost:3000/comments")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((comments) => {
    // All the comments are displayed from the db.json
    comments.forEach((comment) => {
      const commentContainer = createCommentElement(comment);
      commentsList.appendChild(commentContainer);
    });
  })
  .catch((error) => {
    console.error("Error fetching comments:", error.message);
    // Display an error message to the user
    const errorMessage = document.createElement("p");
    errorMessage.textContent =
      "Error fetching comments. Please try again later.";
    commentsList.appendChild(errorMessage);
  });
function createCommentElement(comment) {
  const commentContainer = document.createElement("div");
  commentContainer.classList.add("comment-container");

  const commentElement = document.createElement("p");
  commentElement.textContent = comment.body;

  const userDetails = document.createElement("div");
  userDetails.classList.add("user-details");

  commentContainer.appendChild(commentElement);
  commentContainer.appendChild(userDetails);
  showButtons(commentContainer, comment, userDetails);
  // When clicked, the comment displays the buttons and turns grey
  commentElement.addEventListener("click", () =>
    toggleComment(commentContainer, comment)
  );
  return commentContainer; // Return the created comment container
}
function toggleComment(commentContainer) {
  // the function make the comment turn grey
  commentContainer.classList.toggle("clicked");
}
function showButtons(commentContainer, comment, userDetails) {
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
    showUserDetails(comment, userDetails);
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

  commentContainer.appendChild(replyInput);
  commentContainer.appendChild(buttonsDiv);
  buttonsDiv.classList.add("show");
}

function showUserDetails(comment, userDetails) {
  // Remove any existing child element
  while (userDetails.firstChild) {
    userDetails.removeChild(userDetails.firstChild);
  }
  const nameElement = document.createElement("p");
  nameElement.textContent = comment.name;
  const emailElement = document.createElement("p");
  emailElement.textContent = comment.email;
  const phoneElement = document.createElement("p");
  phoneElement.textContent = comment.phone;

  userDetails.appendChild(nameElement);
  userDetails.appendChild(emailElement);
  userDetails.appendChild(phoneElement);

  userDetails.classList.toggle("show");
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
  const replyElements = commentContainer.querySelectorAll(".reply-text");
  replyElements.forEach((replyElement) => replyElement.remove());
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
