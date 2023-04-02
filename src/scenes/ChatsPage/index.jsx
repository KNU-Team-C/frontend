import React from 'react';
import styles from './styles.module.sass';

function ChatPage() {
    return (
        <div className={styles.chatWrapper}>
            <div className={styles.chatContainer}>
                <div className={styles.chatsList}>
                    <div className={styles.chatsListHeader}>Chats</div>
                    <div className={styles.chatItems}></div>
                </div>
                <div className={styles.chatMessages}>
                    <div className={styles.chatMessagesHeader}>Name</div>
                    <div className={styles.chatBodyWrapper}>
                        <div className={styles.chatBody}></div>
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