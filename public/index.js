const socket = io();

//----------------chat----------------

const chatInputGroup = document.getElementById("chatInputGroup");
const chatInput = document.getElementById("chatInput");
const chatBtn = document.getElementById("chatBtn");
chatBtn.setAttribute("disabled", "");

const tokenInput = document.getElementById("tokenInput");
const tokenBtn = document.getElementById("tokenBtn");

const userSelect = document.getElementById("usersSelect");

const messagesDiv = document.getElementById("messages");

const errorDiv = document.getElementById("error");

socket.on("success", (_data) => console.log("conectado correctamente a socket io"));

tokenBtn.addEventListener("click", (e) => {
    socket.emit("authorize", tokenInput.value);
});

socket.on("unauthorized", (msg) => {
    console.log(msg);
    errorDiv.innerHTML += msg.msg;
});

socket.on("authorized", (data) => {
    chatBtn.removeAttribute("disabled");
    const arrUnique = [...new Map(data.map((v) => [v.email, v])).values()];

    arrUnique.forEach((message) => {
        const option = document.createElement("option");
        option.text = message.email;
        option.value = message.email;
        userSelect.add(option);
    });
    injectMessages(data);
});

socket.on("newMessage", (data) => {
    injectMessages([data]);
});

chatBtn.addEventListener("click", (e) => {
    const message = chatInput.value;
    chatInput.value = "";
    socket.emit("postMessage", { message, type: "system", email: userSelect.value });
});

const injectMessages = (messages) => {
    let formattedMessages = "";
    messages.forEach((msg) => {
        formattedMessages += `<span style="font-weight:bold;${msg.type === "system" && "color:blue"}">${
            msg.email
        }</span> 
        <span style="color:brown;font-size:12px">${msg.createdAt}</span>: 
        <span style="color:green;font-style:italic">${msg.message}</span>
        <br>`;
    });
    console.log(formattedMessages);
    messagesDiv.innerHTML += formattedMessages;
};