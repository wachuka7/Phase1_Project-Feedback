document.addEventListener("DOMContentLoaded", function () {
    const commentsList=document.querySelector('#comments-list')
    const commentElement = document.querySelector('.comments')
    const userDetails=document.querySelector('#customer-details')
   
    fetch('http://localhost:3000/comments')
        .then(response=>response.json())
        .then(comments=> {
            fetch('http://localhost:3000/users')
            .then(response=>response.json())
            .then(users=> {
                    renderComments(comments,users)
                
            }