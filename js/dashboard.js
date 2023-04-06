const blogPost = document.getElementById("blogPost")
const newPostButton = document.getElementsByClassName("newPostButton")
const postText = document.getElementById("postText")

postText.addEventListener("input", function() {
    this.style.height = "auto"
    this.style.height = this.scrollHeight + "px";
})

for (i = 0; i < newPostButton.length; i++) {
    newPostButton[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let newPostForm = this.nextElementSibling;
        if (newPostForm.style.maxHeight) {
            newPostForm.style.maxHeight = null;
        } else {
            newPostForm.style.maxHeight = newPostForm.scrollHeight + "px";
        }
    });
}

function scrollTextarea(event) {
    let textarea = document.getElementById("postText");
    textarea.scrollTop -= event.deltaY;
  }


