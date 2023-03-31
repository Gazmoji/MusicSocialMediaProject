const getBackButton = document.getElementById("goBackButton");
const chatMessageTextBox = document.getElementById("chatMessageTextBox");
const sendMessageButton = document.getElementById("sendMessageButton");
const messagesUL = document.getElementById("messagesUL");

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

sendMessageButton.addEventListener("click", () => {
  const chatMessage = chatMessageTextBox.value;
  socket.emit("General", { message: chatMessage });
});

socket.on("General-Joined", (chatMessages) => {
  const chatMessagesItems = chatMessages.map((chatMessage) => {
    return `<li>${chatMessage.message}</li>`;
  });

  messagesUL.innerHTML = chatMessagesItems.join("");
});

socket.on("General", (chat) => {
  const chatMessageLI = `<li>${chat.message}</li>`;
  messagesUL.insertAdjacentHTML("beforeend", chatMessageLI);
});
