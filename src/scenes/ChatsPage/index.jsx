import React, {useEffect, useState} from 'react';
import styles from './styles.module.sass';
import ChatInfo from '../../components/ChatComponents/ChatInfo';
import ChatMessage from "../../components/ChatComponents/ChatMessage";
import ChatClient from "./client";

function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [client, setClient] = useState(null);

    useEffect(() => {
        console.log("Connecting to server");

        const chatClient = new ChatClient(
            "http://127.0.0.1:5000",
            {
                connect: () => {
                    console.log("Connected to server");
                },
                disconnect: () => {
                    console.log("Disconnected from server");
                },
                message: (message) => {
                    console.log("Message received", message);
                    if (typeof message !== "object") {
                        return;
                    }
                    setMessages((prevMessages) => [...prevMessages, {text: message.message, time: Date.now()}]);
                },
            }
        );

        setClient(chatClient);

        return () => {
            chatClient.disconnect();
        };
    }, []);

    useEffect(() => {
        if (client) {
            client.joinChat("tkn", {
                "chat-id": 1,
                "sender-id": 1,
            });
            console.log("Joined chat")
        }
    }, [client]);

    const sendMessage = () => {
        setMessages([...messages, { text: "Hello, how are you?", time: "10:00" }]);
    };

    return (
        <div className={styles.chatWrapper}>
            <div className={styles.chatContainer}>
                <div className={styles.chatsList}>
                    <div className={styles.chatsListHeader}>Chats</div>
                    <div className={styles.chatItems}>
                        <ChatInfo user={
                            {
                                name: "John Doe",
                                icon: "https://cdn-icons-png.flaticon.com/512/3/3729.png",
                                lastMessage: "Hello, how are you?"
                            }
                        }></ChatInfo>
                        <ChatInfo user={
                            {
                                name: "John Doe",
                                icon: "https://cdn-icons-png.flaticon.com/512/3/3729.png",
                                lastMessage: "Hello, how are you?"
                            }
                        }></ChatInfo>
                        <ChatInfo user={
                            {
                                name: "John Doe",
                                icon: "https://cdn-icons-png.flaticon.com/512/3/3729.png",
                                lastMessage: "Hello, how are you?"
                            }
                        }></ChatInfo>
                    </div>
                </div>
                <div className={styles.chatMessages}>
                    <div className={styles.chatMessagesHeader}>Name</div>
                    <div className={styles.chatBodyWrapper}>
                        <div className={styles.chatBody}>
                            {
                                messages.map((message, index) => {
                                    return (
                                        <ChatMessage key={index} message={message} isMine={index % 2 === 0}></ChatMessage>
                                    )
                                })
                            }
                        </div>
                        <div className={styles.chatInputWrapper}>
                            <input type="text" className={styles.chatInput} />
                            <button className={styles.chatInputButton} onClick={sendMessage}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;