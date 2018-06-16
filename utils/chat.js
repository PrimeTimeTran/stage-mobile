import createChannel from './cable'

let callback

const chat = createChannel('ChatChannel', {
  connected() {
    console.log('Connected')
  },
  disconnected() {
    console.log('Disconnected')
  },
  received( message ) {
    if (callback) callback.call(null, message)
  }
})

function sendMessage(data) {
  chat.perform('send_message', { data })
}

function setCallback(fn) {
  callback = fn
}

export { sendMessage, setCallback }

// Create a class, export it, let the class wrap the methods.