const socket=io('http://localhost:8000');
const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer=document.querySelector(".container");
const username=prompt("Enter your name to join");
const audio=new Audio('ding.mp3');
document.querySelector(".user").innerHTML=`Username: ${username}`;


function append(mes,pos){
    const messageElement=document.createElement('div');
    messageElement.innerText=mes;
    messageElement.classList.add('message');
    messageElement.classList.add(pos);
    messageContainer.append(messageElement);
}

form.addEventListener('submit',e=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You:${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';

});



socket.emit('new-user-joined',username);

socket.on('user-joined',user=>{
    append(`${user} joined the chat`,'left');
    audio.play();
});


socket.on('receive',data=>{
    append(`${data.name}:${data.message}`,'left');
    audio.play();
});

socket.on('left',username=>{
    append(`${username} left the chat`,'left');
    audio.play();
})
