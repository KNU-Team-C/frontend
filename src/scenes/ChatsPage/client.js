// ChatClient.js

import { io } from "socket.io-client";

class ChatClient {
    constructor(uri, callbacks) {
        this.socket = io(uri);

        for (let key in callbacks) {
            this.socket.on(key, callbacks[key]);
        }
    }

    joinChat(token, data) {
        this.socket.emit("join chat", token, JSON.stringify(data));
    }

    leaveChat(token, data) {
        this.socket.emit("leave chat", token, JSON.stringify(data));
    }

    sendMessage(token, data) {
        this.socket.emit("chat message", token, JSON.stringify(data));
    }

    disconnect() {
        this.socket.disconnect();
    }
}

export default ChatClient;
