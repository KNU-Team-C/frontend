import React from "react";

import styles from "./styles.module.sass";

const ChatInfo = ({user, active}) => {
    return (
        <div className={active ? styles.chatInfoActive : styles.chatInfo}>
            <div className={styles.chatIconWrapper}>
                <img className={styles.chatIcon} src={user.icon}></img>
            </div>
            <div className={styles.chatInfoBody}>
                <div className={styles.chatInfoHeader}>
                    <h3>{user.name}</h3>
                </div>
                <div className={styles.chatInfoLastMessage}>
                    {user.lastMessage ? user.lastMessage : "No messages yet"}
                </div>
            </div>
        </div>
    )
}

export default ChatInfo;