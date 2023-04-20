import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.sass';
import ChatInfo from '../../components/ChatComponents/ChatInfo';
import ChatMessage from "../../components/ChatComponents/ChatMessage";
import ChatClient from "./client";
import { getToken } from "../../helpers/token.helper";
import { createChat, getChats, getMe, getMessages } from "./service";

const paddedDate = (num) => {
    return num.toString().padStart(2, '0');
}

const parseDate = (date) => {
    const d = new Date(date);
    // if today - show time
    // else - show date
    const today = new Date();
    if (d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear()) {
        return `${paddedDate(d.getHours())}:${paddedDate(d.getMinutes())}`;
    } else if (d.getFullYear() === today.getFullYear()) {
        return `${d.getDate()}.${paddedDate(d.getMonth())} ${paddedDate(d.getHours())}:${paddedDate(d.getMinutes())}`;
    } else {
        return `${d.getDate()}.${paddedDate(d.getMonth())}.${d.getFullYear()} ${paddedDate(d.getHours())}:${paddedDate(d.getMinutes())}`;
    }
}

function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [client, setClient] = useState(null);
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [showCreateChatModal, setShowCreateChatModal] = useState(false);
    const messagesContainerRef = useRef(null);

    const handleCreateChatButtonClick = () => {
        setShowCreateChatModal(true);
    };

    const createChatWrapper = async (user_id) => {
        // Implement chat creation logic here

        await createChat(user_id);

        setShowCreateChatModal(false);
    };

    const updateMessages = async () => {
        if (currentChat) {
            setMessages((await getMessages(currentChat)).map((message) => {
                return {
                    text: message.message,
                    time: parseDate(message.date),
                    // time: message.date,
                    user_id: message.user_id,
                };
            }));
        }
    }

    useEffect(() => {
        const chatClient = new ChatClient(
            process.env.REACT_APP_SERVER_URL,
            {}
        );

        chatClient.socket.on("connect", () => {
            console.log("Connected to server");
        });

        chatClient.socket.on("disconnect", () => {
            console.log("Disconnected from server");
        });

        chatClient.socket.on("message", async (message) => {
            console.log("Message received", message);
        });

        chatClient.socket.on("cmessage", async (message) => {
            console.log("Message received", message);
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    text: message.message,
                    time: parseDate(message.date),
                    user_id: message.user_id,
                },
            ]);
        });


        setClient(chatClient);

        return () => {
            chatClient.disconnect();
        };
    }, []);

    // setChats([...chats, getChats()])
    useEffect(async () => {
        const chats = await getChats();
        if (chats.length > 0) {
            setCurrentChat(chats[0].id);
        }
        setChats(chats);
        await updateMessages();
    }, [showCreateChatModal]);

    useEffect(async () => {
        const me = await getMe();
        setCurrentUser(me.id);
    }, []);

    useEffect(() => {
        if (messagesContainerRef.current) {
            const element = messagesContainerRef.current;
            element.scrollTop = element.scrollHeight;
        }
    }, [messages, currentChat]);

    const sendMessage = async (message) => {
        client.sendMessage(getToken(), {
            "chat-id": currentChat,
            "sender-id": currentUser,
            "message": message,
        });
        await updateMessages()
    };

    const changeChat = async (id) => {
        client.leaveChat(getToken(), {
            "chat-id": currentChat,
            "sender-id": currentUser,
        });
        client.joinChat(getToken(), {
            "chat-id": id,
            "sender-id": currentUser,
        });
        setCurrentChat(id);
    };

    useEffect(async () => {
        if (currentChat) {
            await updateMessages();
        }
    }, [currentChat]);


    useEffect(() => {
        if (client && currentChat) {
            client.joinChat(getToken(), {
                "chat-id": currentChat,
                "sender-id": currentUser,
            });
        }
    }, [client]);

    return (
        <div className={styles.chatWrapper}>
            <div className={styles.chatContainer}>
                <div className={styles.chatsList}>
                    <div className={styles.chatHeader}>
                        <button className={styles.createChatButton} onClick={handleCreateChatButtonClick}>Start new chat</button>
                    </div>
                    <div className={styles.chatItems}>
                        {
                            chats.sort((a, b) => a.id < b.id).map((chat, index) => {
                                return (
                                    <div key={index} onClick={() => changeChat(chat.id)}>
                                        <ChatInfo key={index} user={{ icon: chat.ava_url, name: chat.chat_name, lastMessage: chat.last_message }} active={chat.id === currentChat}></ChatInfo>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={styles.chatMessages}>
                    <div className={styles.chatBodyWrapper}>
                        <div className={styles.chatBody} ref={messagesContainerRef}>
                            {
                                messages.map((message, index) => {
                                    return (
                                        <ChatMessage key={index} message={message} isMine={message.user_id === currentUser}></ChatMessage>
                                    )
                                })
                            }
                        </div>
                        <form className={styles.chatInputWrapper} onSubmit={(e) => {
                            e.preventDefault();
                            sendMessage(e.target.msg.value);
                            e.target.msg.value = "";
                        }
                        }>
                            <input type="text" name="msg" className={styles.chatInput} required />
                            <button className={styles.chatInputButton}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
            {showCreateChatModal && (
                <div className={styles.createChatModal}>
                    <h2>Create a new chat</h2>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        createChatWrapper(e.target.user_id.value);
                    }}>
                        <label htmlFor="chatName">With user:</label>
                        <input type="text" name="user_id" required />
                        <button type="submit">Create</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default ChatPage;