const url='https://jsonplaceholder.typicode.com/comments'
const userUrl='https://jsonplaceholder.typicode.com/users'
const renderList=()=>{
    fetch(url)
        .then(resp=>resp.json())
        .then(comment=>{
            comment.forEach(element => {
                const userId=element.it
                const commentContainer=document.querySelector('#comments-list')
                const myComment=document.createElement('div')
                myComment.id='comment'
                myComment.innerHTML=`
                <li clas='list'>${element.body}</li>
                
                `
                commentContainer.appendChild(myComment)
                document.addEventListener('click', ()=>showDetails(userId))
            })
            })
}
renderList()
const showDetails=userId=>{
    fetch(`${userUrl}/1`)
        .then(res=>res.json())
        .then(data=>{
            const myComment=document.querySelector('#user-details')
            const userDetails=document.createElement('div')
            userDetails.innerHTML=`
            <p>${data.name}</p>`
        })
}


            