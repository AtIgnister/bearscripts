function randPost() {
    const posts = document.querySelectorAll("li a");
    var post = posts[Math.floor(Math.random()*posts.length)];
    window.location.href = post.href;
}

function createButton() {
  const button = document.createElement("button");
  button.addEventListener("click", randPost)

  button.textContent = "I'm feeling lucky!";

  button.id = "btn";
  button.className = "btn";
  button.style.marginTop = "20px"
  button.style.borderBlockColor = "#FFA86A";
  button.style.backgroundColor = "#222129"
  button.style.color = "#FFA86A";

  const tagsElement = document.querySelector(".tags");

  if (tagsElement && tagsElement.parentNode) {
    tagsElement.parentNode.insertBefore(button, tagsElement.nextSibling);
  }

}

if(location.pathname === "/blog/") {
  createButton()
}