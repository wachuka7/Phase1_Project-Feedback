document.addEventListener("DOMContentLoaded", function () {
    const commentsList = document.getElementById('comments-list');

    fetch('http://localhost:3000/comments')
        .then(response => response.json())
        .then(comments => {
            
                // All the comments are displayed from the db.json
                comments.forEach((comment,index) => {
                    const commentContainer = document.createElement('div');
                    commentContainer.classList.add('comment-container');

                    const commentElement = document.createElement('p');
                    commentElement.textContent = comment.body;
                    commentElement.addEventListener('click', () => toggleComment(commentContainer,index));

                    commentsList.appendChild(commentContainer);
                    commentContainer.appendChild(commentElement);
                });
           
        })
        .catch(error => {
            console.error('Error fetching comments:', error);
            commentsList.textContent = 'Error fetching comments.';
        });

        function toggleComment(commentContainer) {
            // Toggle the 'clicked' class on the commentContainer
            const buttons = commentContainer.querySelector('.options');
            const buttonsVisible = buttons && buttons.classList.contains('show');
        
            // Toggle the 'clicked' class on the commentContainer
            commentContainer.classList.toggle('clicked');
            
            // Show or hide options based on the visibility of buttons
            if (buttonsVisible) {
                hideButtons(commentContainer);
            } else {
                showButtons(commentContainer);
            }
        }
    
        function showButtons(commentContainer) {
            const buttonsDiv = document.createElement('div');
            buttonsDiv.classList.add('options');
    
            const likeButton = document.createElement('button');
            likeButton.textContent = 'Like';
            likeButton.addEventListener('click', (event) => likeComment(likeButton, event));
    
            const seeUserDetailsButton = document.createElement('button');
            seeUserDetailsButton.textContent = 'See Details';
            seeUserDetailsButton.addEventListener('click', () => showUserDetails());
    
            const optionsButton = document.createElement('button');
            optionsButton.textContent = 'Options';
            optionsButton.addEventListener('click', () => showOptions(optionsButton, commentContainer))

            const optionsDiv= document.createElement('div');
            optionsDiv.classList.add('options');

            buttonsDiv.appendChild(likeButton);
            buttonsDiv.appendChild(seeUserDetailsButton);
            buttonsDiv.appendChild(optionsButton);
            buttonsDiv.appendChild(optionsDiv);
            commentContainer.appendChild(buttonsDiv);
    
            // Add 'show' class to make options div visible
            buttonsDiv.classList.add('show');
        }
    
        function hideButtons(commentContainer) {
            // Find and remove the options div from the comment container
            const buttonsDiv = commentContainer.querySelector('.options');
            buttonsDiv.remove();
        }
    })
    function likeComment(button, event) {
        // Toggle the 'liked' class on the button
        button.classList.toggle('liked');

        // Stop the event from propagating to prevent clicking the comment triggering this event
        event.stopPropagation();
    }
    function showOptions(optionsDiv, commentContainer){
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteComment(commentContainer));

        const markAsReadButton = document.createElement('button');
        markAsReadButton.textContent = 'Mark as Read';
        markAsReadButton.addEventListener('click', () => markAsRead(commentContainer));

        optionsDiv.appendChild(deleteButton);
        optionsDiv.appendChild(markAsReadButton);
        optionsDiv.classList.add('show');
    }
    function deleteComment(commentContainer) {
        const confirmDelete = confirm("Do you want to delete this comment?");

        if (confirmDelete) {
            commentContainer.remove();
        }
    }
    function markAsRead(commentContainer) {
       
        commentContainer.querySelector('p').add('read-comment');
    }
    function showUserDetails() {
        const userDetails=document.querySelector('#user-details')
        fetch(`https://jsonplaceholder.typicode.com/users`)
            .then(response=>response.json())
            .then(users=>{
            userDetails.innerHTML = `
                <p>User Details:</p>
                <p>Name: ${users.name}</p>
                <p>Email: ${users.email}</p>
                <p>Phone: ${users.phone}</p>
            `;
                })

    }

    