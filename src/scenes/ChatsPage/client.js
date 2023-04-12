// ChatClient.js

import { io } from "socket.io-client";

class ChatClient {

    constructor(uri, callbacks) {
        this.socket = io(uri, {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: Infinity,
        });

        for (let key in callbacks) {
            this.socket.on(key, callbacks[key]);
        }

        this.callbacks = callbacks;
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
        for (let key in this.callbacks) {
            this.socket.off(key, this.callbacks[key]);
        }
    }
}

export default ChatClient;
