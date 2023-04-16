import React, {useEffect, useState} from 'react';
import styles from './styles.module.sass';
import ChatInfo from '../../components/ChatComponents/ChatInfo';
import ChatMessage from "../../components/ChatComponents/ChatMessage";
import ChatClient from "./client";
import {getToken} from "../../helpers/token.helper";
import {createChat, getChats, getMe, getMessages} from "./service";

function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [client, setClient] = useState(null);
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [showCreateChatModal, setShowCreateChatModal] = useState(false);

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
                    time: message.time,
                    user_id: message.user_id,
                };
            }));
        }
    }

    useEffect(() => {

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
                    updateMessages().then();
                },
            }
        );

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
    }, []);

    useEffect(async () => {
        const me = await getMe();
        setCurrentUser(me.id);
    }, []);


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
        await updateMessages()
    };

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
                    <div className={styles.chatsListHeader}>
                            Chats
                            <button className={styles.createChatButton} onClick={handleCreateChatButtonClick}>Create chat</button>
                    </div>
                    <div className={styles.chatItems}>
                        {
                            chats.sort((a, b) => a.id < b.id).map((chat, index) => {
                                return (
                                    <div key={index} onClick={() => changeChat(chat.id)}>
                                        <ChatInfo key={index} user={{ icon: chat.ava_url, name: chat.chat_name + ' ' + chat.id}} active={chat.id === currentChat}></ChatInfo>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={styles.chatMessages}>
                    <div className={styles.chatMessagesHeader}>Name</div>
                    <div className={styles.chatBodyWrapper}>
                        <div className={styles.chatBody}>
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
                            <input type="text" name="msg" className={styles.chatInput} required/>
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