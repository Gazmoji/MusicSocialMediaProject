const getBackButton = document.getElementById("goBackButton");
const chatMessageTextBox = document.getElementById("chatMessageTextBox");
const sendMessageButton = document.getElementById("sendMessageButton");
const messagesUL = document.getElementById("messagesUL");
const timeRightSpan = document.querySelector(".time-right");
const userCountElement = document.getElementById("userCount");
const currentTime = new Date().toLocaleTimeString();
timeRightSpan.textContent = currentTime;
const currentUser = document.cookie.replace(
  /(?:(?:^|.*;\s*)currentUser\s*\=\s*([^;]*).*$)|^.*$/,
  "$1"
);
const currentUserProfilePicture = decodeURIComponent(
  document.cookie.replace(
    /(?:(?:^|.*;\s*)currentUserProfilePicture\s*\=\s*([^;]*))/i,
    "$1"
  )
);

getBackButton.addEventListener("click", () => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/chatroom");
  xhr.send();

  xhr.onload = function () {
    if (xhr.status === 200) {
      window.location.href = "/chatroom";
    } else {
      console.log("Error:", xhr.status);
    }
  };
});

socket.on("userCount", (count) => {
  userCountElement.textContent = count;
});

sendMessageButton.addEventListener("click", () => {
  const chatMessage = chatMessageTextBox.value;
  socket.emit("General", {
    username: currentUser,
    message: chatMessage,
    profilePicture: currentUserProfilePicture,
  });
});

socket.on("General-Joined", (chatMessages) => {
  const currentTime = new Date().toLocaleTimeString();
  const chatMessagesItems = chatMessages.map((chatMessage) => {
    return `<li>${chatMessage.username}: ${chatMessage.message} <img src='${chatMessage.profilePicture}'><span class="time-right">${currentTime}</span></li>`;
  });

  messagesUL.innerHTML = chatMessagesItems.join("");
});

socket.on("General", (chat) => {
  const currentTime = new Date().toLocaleTimeString();
  let chatMessageli = "";
  if (chat.username === currentUser) {
    chatMessageli = `<li class='container'>${chat.username}: ${chat.message} <img src='${chat.profilePicture}'> <span class="time-right">${currentTime}</span></li>`;
  } else {
    if (chat.username === "Server") {
      chatMessageli = `<li class='container-darker'>${chat.username}: ${chat.message} <span class="time-right">${currentTime}</span></li>`;
    } else {
      chatMessageli = `<li class='container-darker'>${chat.username}: ${chat.message} <img src='${chat.profilePicture}'><span class="time-right">${currentTime}</span></li>`;
    }
  }
  messagesUL.insertAdjacentHTML("beforeend", chatMessageli);
});
