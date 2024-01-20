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

                    commentContainer.appendChild(commentElement)
                    commentsList.appendChild(commentContainer)
                    commentElement.addEventListener('click', () => toggleComment(commentContainer,comment));

                 
                       
                    })      
    })
    })
        // .catch(error => {
        //     console.error('Error fetching comments:', error);
        //     commentsList.textContent = 'Error fetching comments.';
        // })
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
    
        function showButtons(commentContainer, comment) {
            const buttonsDiv = document.createElement('div');
            buttonsDiv.classList.add('options');
    
            const likeButton = document.createElement('button');
            likeButton.textContent = 'Like';
            likeButton.addEventListener('click', (event) => likeComment(likeButton, event));
    
            const seeUserDetailsButton = document.createElement('button');
            seeUserDetailsButton.textContent = 'See Details';
            seeUserDetailsButton.addEventListener('click', () =>showUserDetails(comment, commentContainer));
    
            const optionsButton = document.createElement('button');
            optionsButton.textContent = 'Options';
            optionsButton.addEventListener('click', (event) => {
              showOptions(optionsButton, commentContainer)})
  
            const optionsDiv= document.createElement('div');
            optionsDiv.classList.add('options');
            
            buttonsDiv.appendChild(likeButton);
            buttonsDiv.appendChild(seeUserDetailsButton);
            buttonsDiv.appendChild(optionsButton);
            buttonsDiv.appendChild(optionsDiv);
            commentContainer.appendChild(buttonsDiv);
            commentContainer.appendChild(userDetails);
           
    
           
            buttonsDiv.classList.add('show');
        }
    
        function hideButtons(commentContainer) {
            // Find and remove the options div from the comment container
            const buttonsDiv = commentContainer.querySelector('.options');
            buttonsDiv.remove();
        }
      
        function showUserDetails(comment,commentContainer) { 
            
            const nameElement = document.createElement('p');
            nameElement.textContent = comment.name;
            const emailElement = document.createElement('p');
            emailElement.textContent = comment.email;
            const phoneElement =document.createElement('p');
            phoneElement.textContent = comment.phone;
            
            commentContainer.appendChild(nameElement)
            commentContainer.appendChild(emailElement)
            commentContainer.appendChild(phoneElement)
    
        };
  
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
