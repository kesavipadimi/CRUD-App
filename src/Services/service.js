export const getProfiles = () => {
    return fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json());    
};

export const getPosts = (id) => {
    return fetch(`https://jsonplaceholder.typicode.com/user/${id}/posts/`).then(res => res.json());    
};

export const getComments = (id) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`).then(res => res.json());    
};

export const addComment = (comment) => {
    return fetch('https://jsonplaceholder.typicode.com/comments', {
        method: 'POST',
        body: JSON.stringify({
            "postId": 1,
            "id": 1,
            "name": "John Snow",
            "email": "Eliseo@gardner.biz",
            "body": comment
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((response) => response.json())
};

export const deleteComment = (id) => {
    return fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
        method: 'DELETE',
    });
};
