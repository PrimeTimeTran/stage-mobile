import createChannel from './cable';

let callback; // declaring a variable that will hold a function later

const chat = createChannel('ChatChannel', {
  connected() {
    console.log('Connected')
  },
  disconnected() {
    console.log('Disconnected');
  },
  received( message ) {
    console.log('Message: ', message)
    if (callback) callback.call(null, message);
  }
});

// Sending a message: "perform" method calls a respective Ruby method
// defined in chat_channel.rb. That's your bridge between JS and Ruby!
function sendMessage(data) {
  chat.perform('send_message', { data });
}

// Getting a message: this callback will be invoked once we receive
// something over ChatChannel
function setCallback(fn) {
  callback = fn;
}

export { sendMessage, setCallback };