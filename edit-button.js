function getEditUrl() {
    const blogname = document.querySelectorAll('meta')[2].name
    const post_token = document.querySelector('meta[name="token"]').content

    const editUrl = `https://bearblog.dev/${blogname}/dashboard/posts/${post_token}/`
    return editUrl;
}

function editRedirect() {
    const url = getEditUrl()
    window.location.replace(url)
}

function createEditButton() {
    const btn = document.createElement("button")
    btn.innerText = "Edit Post"
    btn.addEventListener("click", editRedirect)
    const postTitle = document.querySelector('main h1')
    if(postTitle) {
        postTitle.appendChild(btn);
    }
}