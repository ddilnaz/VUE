<template>
  <Header></Header>
  <div class="chat">
    <h1>Chat with {{ userName }}</h1>
    <div class="chat-box" ref="chatBox">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="{'sent': message.sender === 'me', 'received': message.sender === 'user'}"
      >
        <p>{{ message.text }}</p>
      </div>
    </div>
    <div class="chat-input">
      <input
        type="text"
        v-model="newMessage"
        placeholder="Type your message here..."
        @keyup.enter="sendMessage"
      />
      <button @click="sendMessage">Send</button>
      <!-- Button to clear the chat -->
      <button @click="clearChat" class="clear-chat-btn">Clear Chat</button>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
  components: { Header },
  props: {
    userName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      messages: [], // Messages array
      newMessage: "",
      randomResponses: [
        "Hello there!",
      ],
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() === "") return;

      const newMessage = { sender: "me", text: this.newMessage };
      this.messages.push(newMessage);
 
      this.saveMessagesToLocalStorage();
      if (this.newMessage.includes("Dilnaz Talant")) {
      this.newMessage = "";
      this.scrollToBottom();
      return; // Прекращаем выполнение метода
    }

      setTimeout(() => {
        const randomResponse = this.getRandomResponse();
        const responseMessage = {
          sender: "user",
          text: randomResponse,
        };
        this.messages.push(responseMessage);

        this.saveMessagesToLocalStorage();
        this.scrollToBottom();
      }, 1000);

      this.newMessage = "";
      this.scrollToBottom();
    },


    getRandomResponse() {
      const randomIndex = Math.floor(Math.random() * this.randomResponses.length);
      return this.randomResponses[randomIndex];
    },

    saveMessagesToLocalStorage() {
      localStorage.setItem(`chat_${this.userName}`, JSON.stringify(this.messages));
    },

    loadMessagesFromLocalStorage() {
      const storedMessages = localStorage.getItem(`chat_${this.userName}`);
      if (storedMessages) {
        this.messages = JSON.parse(storedMessages);
      }
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const chatBox = this.$refs.chatBox;
        chatBox.scrollTop = chatBox.scrollHeight;
      });
    },

    // New method to clear the chat
    clearChat() {
      // Clear the messages array
      this.messages = [];
      // Remove messages from localStorage
      localStorage.removeItem(`chat_${this.userName}`);
    },
  },

  mounted() {
    this.loadMessagesFromLocalStorage();
    this.scrollToBottom();
  },
};
</script>
<style scoped>

*,
*::before,
*::after {
  box-sizing: border-box;
}

html, body {
  height: 100%;   /* Full height of the viewport */
  margin: 0;      /* Remove default margin */
  padding: 0;     /* Remove default padding */
  overflow: hidden; /* Prevent overflow on the main screen */
}
h1{
  margin-top: 80px;
}

.chat {
  background: linear-gradient(180deg, #76C5E7 0%, #FBF3F3 100%);
  font-family: 'Inknut Antiqua', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%; /* Full viewport height */
  overflow: hidden; /* Prevent overflow within the chat container */
  padding: 20px;
  margin: 0;
}

.chat-box {
  flex: 1; /* Allow chat box to grow and fill available space */
  overflow-y: auto; /* Vertical scrolling if needed */
  margin-bottom: 20px;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
}

.chat-box .sent, .chat-box .received {
  padding: 10px 15px;
  border-radius: 15px;
  max-width: 75%;
  margin-bottom: 10px;
  display: inline-block;
  word-wrap: break-word;
  display: flex;
  flex-direction: row;
}

.chat-box .sent {
  background-color: #4CAF50;
  color: white;
  margin-left: auto;
  text-align: right;
  border-top-left-radius: 0;
  border-bottom-left-radius: 15px;
}

.chat-box .received {
  background-color: #FF4081;
  color: white;
  margin-right: auto;
  text-align: left;
  border-top-right-radius: 0;
  border-bottom-right-radius: 15px;
}

.chat-box .sent p, .chat-box .received p {
  margin: 0;
  font-size: 1rem;
}

/* Ensure that the chat input is positioned properly */
.chat-input {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  margin: 0;
}

/* Prevent input field and button from overflowing */
.chat-input input {
  flex: 1;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 10px;
  font-size: 1rem;
}

.chat-input button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.chat-input button:hover {
  background-color: #45a049;
}

</style>
