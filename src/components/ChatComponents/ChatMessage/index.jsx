import React from "react";

import styles from "./styles.module.sass";

const ChatMessage = ({message, isMine}) => {
    return (
        <div className={`${styles.chatMessageWrapper} ${isMine ? styles.isMine : ''}`}>
            <div className={`${styles.chatMessage} ${isMine ? styles.isMine : ''}`}>
                {message.text}
            </div>
            <div className={styles.chatMessageInfoWrapper}>
                <div className={styles.chatMessageTime}>
                    {message.time}
                </div>
            </div>
        </div>
    )
}

export default ChatMessage;