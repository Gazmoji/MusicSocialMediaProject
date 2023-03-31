const getBackButton = document.getElementById("goBackButton");

getBackButton.addEventListener("click", () => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/chat");
  xhr.send();

  xhr.onload = function () {
    if (xhr.status === 200) {
      window.location.href = "/chat";
    } else {
      console.log("Error:", xhr.status);
    }
  };
});
