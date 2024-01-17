document.addEventListener("DOMContentLoaded", function () {
    const commentsList = document.getElementById('comments-list');

    fetch(' http://localhost:3000/comments')
        .then(response => response.json())
        .then(comments => {
            if (comments.length > 0) {
                // Displaying all comments
                comments.forEach(comment => {
                    const commentContainer = document.createElement('div');
                    commentContainer.classList.add('comment-container');

                    const commentElement = document.createElement('p');
                    commentElement.textContent = comment.body;

                    const optionsDiv = document.createElement('div');
                    optionsDiv.classList.add('options');
                    
                    const likeButton = document.createElement('button');
                    likeButton.textContent = 'Like';
                    likeButton.addEventListener('click', () => likeComment(likeButton, comment.id));
                    
                    const seeMoreButton = document.createElement('button');
                    seeMoreButton.textContent = 'See More';
                    seeMoreButton.addEventListener('click', () => seeMoreComment(comment.id));

                    const optionsButton = document.createElement('button');
                    optionsButton.textContent = 'Options';
                    optionsButton.addEventListener('click', () => showOptions(comment.id));

                    optionsDiv.appendChild(likeButton);
                    optionsDiv.appendChild(seeMoreButton);
                    optionsDiv.appendChild(optionsButton);

                    commentContainer.appendChild(commentElement);
                    commentContainer.appendChild(optionsDiv);

                    commentsList.appendChild(commentContainer);
                });
            } else {
                commentsList.textContent = 'No comments available.';
            }
        })
        .catch(error => {
            console.error('Error fetching comments:', error);
            commentsList.textContent = 'Error fetching comments.';
        });
        function likeComment(button, commentId) {
            // Toggle the 'liked' class on the button
            button.classList.toggle('liked');
        }

});



        //     <button id="details-button">See More</button>
        //     <button id="options-button">Options</button>
        //     `;
        //     commentsList.appendChild(eachComment);
        //     const optionsButton=document.querySelector('#details-button')
        //     optionsButton.addEventListener('click', () => showOptions())
//         })
//     }
// })
    // function showOptions(){ 
    //     const options=document.createElement('div')
    //     eachComment.appendChild(options)
    //     options.id="options"
    //     options.innerHTML=`
    //     <p>Delete this Comment</p>
    //     <p>Turn off comments from thi user</p>
    //     `
        
    // }
           
            
          
            
        
           
    //         const button=document.querySelector('#details-button')
    //         button.addEventListener('click', () => showUserDetails(comment));
            
    //     };
    // })

//     function showUserDetails(comment) {
//         console.log(comment)
//         // fetch('https://jsonplaceholder.typicode.com/users')
//         //         .then(response => response.json())
//         //         .then(users => {
//                     const userDetails=document.createElement('div')
//                     userDetails.id='customer-details'
//                     userDetails.innerHTML = `
//                         <p>${comment.body}</p>
//                         <p>By: ${comment.name}</p>
//                         <p>Email: ${comment.email}</p>
//                         <button id="like-btn">Like</button>
//                         <button id="reply-btn">Reply</button>
//                     `;
//                     document.body.appendChild(userDetails)

    
//     // })
// }
// });
