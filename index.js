document.addEventListener("DOMContentLoaded", function () {
    const commentsList=document.querySelector('#comments-list')
    const userDetails=document.querySelector('#customer-details')
   
    fetch('http://localhost:3000/comments')
        .then(response=>response.json())
        .then(comments=> {console.log(comments)
            fetch('http://localhost:3000/users')
            .then(response=>response.json())
            .then(users=> {console.log(users)
                    renderComments(comments,users)
            })
            .catch(error => error('Error fetching users:', error))
        })
        .catch(error => console.error('Error fetching comments:', error));
    
    function renderComments(comments, users) {
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.innerHTML = `<p>${comment.body}</p>`;
            commentElement.addEventListener('click', () => showUserDetails(comment, users));
            commentsList.appendChild(commentElement);
        });
    }
       
    })
