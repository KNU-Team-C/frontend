import React from 'react';
import styles from './styles.module.sass';
import ChatInfo from '../../components/ChatComponents/ChatInfo';
import ChatMessage from "../../components/ChatComponents/ChatMessage";

function ChatPage() {
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
                            <ChatMessage message={
                                {
                                    text: "Hello, how are you?",
                                    time: "10:00"
                                }
                            } isMine={true}></ChatMessage>
                            <ChatMessage message={
                                {
                                    text: "Hello, how are you?",
                                    time: "10:00"
                                }
                            } isMine={false}></ChatMessage>
                        </div>
                        <div className={styles.chatInputWrapper}>
                            <input type="text" className={styles.chatInput} />
                            <button className={styles.chatInputButton}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;