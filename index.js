document.addEventListener('DOMContentLoaded', function () {
  const signinContainer = document.querySelector('.login-container');
  const signinForm = document.getElementById('login-form');
  const mainPage = document.querySelector('.post-container');

  function signIn() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const username = usernameInput.value;
    const password = passwordInput.value;

    if (username === '1234' && password === '1234') {
      signinContainer.style.display = 'none';
      mainPage.style.display = 'block';
    } else {
      alert('Invalid username or password. Please try again.');
    }
  }

  signinForm.addEventListener('submit', function (event) {
    event.preventDefault();
    signIn();
  });

  const commentsIcon = document.querySelector('.comments-icon');
  const commentsList = document.querySelector("#comments-list");
  commentsList.style.display = 'none';

  commentsIcon.addEventListener('click', () => {
    commentsList.style.display = commentsList.style.display === 'none' ? 'block' : 'none';
  });

  const commentInput = document.getElementById("comment-input");
  const commentForm = document.getElementById("comment-form");

  commentForm.addEventListener("submit", function (event) {
    event.preventDefault();
    postComment();
  });

  function postComment() {
    const newCommentText = commentInput.value.trim();
    if (newCommentText !== "") {
      const newComment = { body: newCommentText };

      fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      })
        .then(handleResponse)
        .then(displayNewComment)
        .catch(handleError);
    }
  }

  function handleResponse(response) {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  }

  function displayNewComment(createdComment) {
    const commentContainer = createCommentElement(createdComment);
    commentsList.appendChild(commentContainer);
    commentInput.value = "";
  }

  function handleError(error) {
    console.error("Error posting comment:", error.message);
    alert("Error posting comment. Please try again later.");
  }

  fetch("http://localhost:3000/comments")
    .then(handleResponse)
    .then(displayComments)
    .catch(handleError);

  function displayComments(comments) {
    comments.forEach((comment) => {
      const commentContainer = createCommentElement(comment);
      commentsList.appendChild(commentContainer);
    });
  }

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
    commentElement.addEventListener("click", () => toggleComment(commentContainer));
    return commentContainer;
  }

  function toggleComment(commentContainer) {
    commentContainer.classList.toggle("clicked");
  }

  function showButtons(commentContainer, comment, userDetails) {
    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("options");

    const likeButton = createButton("Like", (event) => likeComment(likeButton, event));
    const seeUserDetailsButton = createButton("See Details", () => showUserDetails(comment, userDetails));
    const replyInput = document.createElement("input");
    const replyButton = createButton("Reply", () => toggleReply(replyInput, commentContainer));
    const optionsButton = createButton("Options", () => toggleOptions(optionsDiv));

    const optionsDiv = document.createElement("div");
    optionsDiv.classList.add("options");

    const deleteButton = createButton("Delete", (event) => deleteComment(commentContainer, event));
    const markAsReadButton = createButton("Mark as Read", (event) => markAsRead(commentContainer, event));

    [deleteButton, markAsReadButton].forEach((btn) => btn.classList.add("show"));
    [likeButton, seeUserDetailsButton, replyButton, optionsButton, optionsDiv].forEach((btn) => buttonsDiv.appendChild(btn));

    commentContainer.appendChild(replyInput);
    commentContainer.appendChild(buttonsDiv);
    buttonsDiv.classList.add("show");
  }

  function createButton(text, clickHandler) {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", clickHandler);
    return button;
  }

  function showUserDetails(comment, userDetails) {
    clearChildElements(userDetails);
    ["name", "email", "phone"].forEach((property) => {
      const element = document.createElement("p");
      element.textContent = comment[property];
      userDetails.appendChild(element);
    });
    userDetails.classList.toggle("show");
  }

  function clearChildElements(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  function likeComment(button, event) {
    button.classList.toggle("liked");
    event.stopPropagation();
  }

  function toggleReply(replyInput, commentContainer) {
    replyInput.classList.toggle("show");

    if (replyInput.classList.contains("show")) {
      replyInput.focus();
    } else {
      const replyText = replyInput.value.trim();

      if (replyText !== "") {
        const replyElement = document.createElement("p");
        replyElement.textContent = replyText;
        replyElement.classList.add("reply-text");

        commentContainer.appendChild(replyElement);
        replyInput.value = "";
      }
    }
  }

  function toggleOptions(optionsDiv) {
    optionsDiv.classList.toggle("show");
  }
 
  function deleteComment(commentContainer, event) {
    const confirmDelete = confirm("Do you want to delete this comment?");
    if (confirmDelete) {
      commentContainer.remove();
    }
    event.stopPropagation();
  }

  function markAsRead(commentContainer, event) {
    const commentText = commentContainer.querySelector("p");
    commentText.classList.add("read-comment");
    event.stopPropagation();
  }
});
