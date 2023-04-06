const signout = document.getElementById("signout");
const edit = document.getElementById("edit");

signout.addEventListener("click", function () {
  location.href = "/login";
});

edit.addEventListener("click", function () {
  location.href = "/profile";
});
