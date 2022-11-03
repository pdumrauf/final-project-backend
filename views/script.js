const socket = io();

//----------------chat----------------

const chatInputGroup = document.getElementById("chatInputGroup");
const chatBtn = document.getElementById("chatBtn");
const chatInput = document.getElementById("chatInput");

const messages = document.querySelector("#messages");

let user;
console.log("carga");
socket.on("success", (data) => {
    console.log(data);

    // denormalizedData.messages.forEach((el) => {
    //     messages.innerHTML += `
    //     <span style="color:blue;font-weight:bold">${el.author?.alias}</span>
    //     <span style="color:brown;font-size:12px">[${el.time}]</span>:
    //     <span style="color:green;font-style:italic">${el.text}</span>
    //     <br>`;
    // });
});

socket.on("newMessage", (data) => {
    if (user) {
        const message = `
        <span style="color:blue;font-weight:bold">${data.author.alias}</span> 
        <span style="color:brown;font-size:12px">[${data.time}]</span>: 
        <span style="color:green;font-style:italic">${data.text}</span>
        <br>`;
        messages.innerHTML += message;
    }
});

chatBtn.addEventListener("click", (e) => {
    const message = chatInput.value;
    chatInput.value = "";
    chatBtn.disabled = true;
    socket.emit("addMessage", { message, user });
});

//fetch initial products

fetch("http://localhost:8080/products/")
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        const tableBody = template({ data });
        document.querySelector("#tableBody").innerHTML = tableBody;
    })
    .catch((e) => console.error(e));

const template = Handlebars.compile(`
    {{#each data}}
        <tr>
            <th scope="row">{{this.id}}</th>
            <td>{{this.title}}</td>
            <td>$ {{this.price}}</td>
            <td><img src="{{this.thumbnail}}" /></td>
        </tr>
    {{/each}}
`);