
document.addEventListener("DOMContentLoaded", function () {
  const commentsList = document.getElementById('comments-list');

  fetch('http://localhost:3000/comments')
      .then(response => response.json())
      .then(comments => {
          
              // All the comments are displayed from the db.json
              comments.forEach((comment) => {
                 
                  const commentContainer = document.createElement('div');
                  commentContainer.classList.add('comment-container');

                  const commentElement = document.createElement('p');
                  commentElement.textContent = comment.body;
                  commentElement.addEventListener('click', () => toggleComment(commentContainer,comment));

                  const userDetails=document.createElement('div')
                  userDetails.classList.add('user-details')
                  userDetails.innerHTML = `
                    <p>User Details:</p>
                    <p>Name: ${comment.name}</p>
                    <p>Email: ${comment.email}</p>
                    <p><span>Contact: ${comment.phone}</span></p>
          `;    
                
                  commentsList.appendChild(commentContainer)
                  commentContainer.appendChild(commentElement)
                  commentContainer.appendChild(userDetails)
              });
         
      })
      .catch(error => {
          console.error('Error fetching comments:', error);
          commentsList.textContent = 'Error fetching comments.';
      });

      function toggleComment(commentContainer,comment) {
          // Toggle the 'clicked' class on the commentContainer
          const buttons = commentContainer.querySelector('.options');
          const buttonsVisible = buttons && buttons.classList.contains('show');
      
          // Toggle the 'clicked' class on the commentContainer
          commentContainer.classList.toggle('clicked');
          
          // Show or hide options based on the visibility of buttons
          if (buttonsVisible) {
              hideButtons(commentContainer);
          } else {
              showButtons(commentContainer, comment);
          }
      }
  
      function showButtons(commentContainer, comment,event) {
          const buttonsDiv = document.createElement('div');
          buttonsDiv.classList.add('options');
  
          const likeButton = document.createElement('button');
          likeButton.textContent = 'Like';
          likeButton.addEventListener('click', (event) => likeComment(likeButton, event));
  
          const seeUserDetailsButton = document.createElement('button');
          seeUserDetailsButton.textContent = 'See Details';
          seeUserDetailsButton.addEventListener('click', () =>showUserDetails(userDetails, comment));
  
          const optionsButton = document.createElement('button');
          optionsButton.textContent = 'Options';
          optionsButton.addEventListener('click', () => {
            showOptions(optionsButton, commentContainer,userDetails)})

          const optionsDiv= document.createElement('div');
          optionsDiv.classList.add('options');

          const userDetails = document.createElement('div');
          userDetails.id = 'user-details';

         
          buttonsDiv.appendChild(likeButton);
          buttonsDiv.appendChild(seeUserDetailsButton);
          buttonsDiv.appendChild(optionsButton);
          buttonsDiv.appendChild(optionsDiv);
          commentContainer.appendChild(buttonsDiv);
          commentContainer.appendChild(userDetails);
         
  
          // Add 'show' class to make options div visible
          buttonsDiv.classList.add('show');
      }
  
      function hideButtons(commentContainer) {
          // Find and remove the options div from the comment container
          const buttonsDiv = commentContainer.querySelector('.options');
          buttonsDiv.remove();
      }
    
      function showUserDetails(comment) {
        const userDetails=document.querySelector('.user-details')
        userDetails.innerHTML = `
        <p>User Details:</p>
        <p>Name: ${comment.userName}</p>
        <p>Email: ${comment.userEmail}</p>
        <p><span>Contact: ${comment.userPhone}</span></p>
    `;
        }
          

        // .catch(error => {
        //     console.error('Error fetching user details:', error);
        // });
     

     function likeComment(button, event) {
      // Toggle the 'liked' class on the button
      button.classList.toggle('liked');

      // Stop the event from propagating to prevent clicking the comment triggering this event
      event.stopPropagation();
  }
  function showOptions(optionsDiv, commentContainer){
      
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', (event) => {
        event.stopPropagation()
        deleteComment(commentContainer)});
     

      const markAsReadButton = document.createElement('button');
      markAsReadButton.textContent = 'Mark as Read';
      markAsReadButton.addEventListener('click', (event) => { 
          event.stopPropagation()
          markAsRead(commentContainer)});

      optionsDiv.appendChild(deleteButton);
      optionsDiv.appendChild(markAsReadButton);
      optionsDiv.classList.add('show');
      
  }
  function deleteComment(commentContainer, event) {
      const confirmDelete = confirm("Do you want to delete this comment?");

      if (confirmDelete) {
          commentContainer.remove();
      }
      event.stopPropagation()
  }
  function markAsRead(commentContainer) {
  
      const commentText = commentContainer.querySelector('p');
      commentText.classList.add('read-comment');
  }
})

  