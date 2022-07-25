export function definePost() {
    class Post extends HTMLElement { }
    customElements.define('post-articles', Post, { extends: 'div'})

    class PostTitle extends HTMLElement { }
    customElements.define('post-title', PostTitle, { extends: 'div'})

    class PostDate extends HTMLElement { }
    customElements.define('post-date', PostDate, { extends: 'div'})

    class PostSummary extends HTMLElement { }
    customElements.define('post-summary', PostSummary, { extends: 'div'})
}

export function generatePostId() {
    return crypto.randomUUID();
}

/**
 * @typedef {{
 * title: string
 * date: string
 * summary: string
 * }} Post
 */


export const examplePost = {
    "title": "A Day in UCSD",
    "date": "09/17/2021",
    "summary": "Today was a great day"
};

/* Storage Layer
 * ============= */

/**
 * @returns the JSON map of books from local storage.
 */
export function loadPosts() {
    return JSON.parse(localStorage.getItem('posts')) || {};
}

/**
 * @param {{string: Book}} books a JSON map of id->book to put into local storage.
 */
function storePosts(posts) {
    localStorage.setItem('posts', JSON.stringify(posts));
}

export function insertPost(post) {
    const posts = loadPosts();
    const postId = generatePostId();

    posts[postId] = post;
    storePosts(post);
    console.log('Error in insert');
    
    return postId;
}

export function selectPost(postId) {
    const posts = loadPosts();

    return posts[bookId];
}

export function selectAllPosts() {
    const posts = loadPosts();
    return posts;
}

export function updatePost(postId, post) {
    const posts = loadPosts();

    posts[postId] = post;

    storePosts();
}

export function deletePost(postId) {
    const posts = loadPosts();

    // If it's not there, just return false. If it is there, delete it.
    if (!(postId in posts)) return false;
    delete posts[postId];
    
    storePosts(postId)
    return true;
}

/**
 * @param {string} [postId] id of post
 * @param {Post} [post]  post
 * @return {DocumentFragment}
 */

export function renderPost(postId,post){
    const template = document.getElementById('post-template')
    const postElement = template.content.cloneNode(true);
    postElement.children[0].dataset.postId = postId;

    const titleH1= postElement.querySelector("post-articles > post-title > h1");
    titleH1.textContent = post.title;
    console.log(post.title)
    console.log(post)

    const dateH2= postElement.querySelector("post-articles > post-date > h2");
    dateH2.textContent = post.date;

    const summaryP= postElement.querySelector("post-articles > post-summary > p");
    summaryP.textContent = post.summary;

    return postElement
};

/**
 * 
 * @param {string} postId 
 * @param {Post|undefined} post 
 * @param {HTMLElement} container 
 */
 export function displayPost(postId, post, container) {
    console.log('Error in display');
    const postElement = renderPost(postId,post);

    const existing = container.querySelector(`[data-post-id="${postId}"]`)
    if(existing) {
        existing.remove();
    }

    if(post) {
        container.appendChild(postElement);
    }

}

/**
 * 
 * @param {*} container 
 */
 export function redisplayAllPosts(container) {
    const posts = selectAllPosts();

    for (const [id, post] of Object.entries(posts)) {
        console.log('Error in redisplay');
        displayPost(id, post, container);
    }
}


//export { definePost, generatePostId, examplePost, renderPost,displayPost};


// let posts = [{title:"title",date:"date",summary:"summary"}];



// document.addEventListener('DOMContentLoaded', function(){
//     let addBtn = document.getElementById("add");
//     let dialog = document.getElementById("dialog");
//     let submitAdd = document.getElementById("submitAdd");
//     let list = document.getElementById("list");
//     let title = document.getElementById('title');
//     let date = document.getElementById('date');
//     let summary = document.getElementById('summary');

//     addBtn.addEventListener('click',function() {
//         dialog.open = true;
//     });
    
//     submitAdd.addEventListener('click', function(){
//         posts[posts.length] = {
//             title: title.value,
//             date: date.value,
//             summary: summary.value
//         }
//         loadInfo();
//     });
// });

// export function loadInfo(){
//     let title = document.getElementById('title');
//     let date = document.getElementById('date');
//     let summary = document.getElementById('summary');
    
//     for(let i = 0; i < posts.length; i++) {
//         let strTemp = `<li> ${title.value}, ${date.value},${summary.value}</li>`
//         list.innerHTML = list.innerHTML + strTemp;
//     }
// }