import React from 'react';
import styles from './styles.module.sass';
import classNames from "../../commons/classnames";


const AdminUserCard = (props) => {
    const {
        username,
        image,
        status,
        company,
        header,
        details,
        onCommunicateClick,
        onUnbanClick,
        onBanClick
    } = props;
    return (
        <div className={classNames(styles.vertical, styles.card)}>
            {header}
            <div className={styles.horizontal}>
                <div>
                    <img src={image} className={styles.user_image} alt={'user image'}/>
                </div>
                <div className={styles.vertical}>
                    <div className={styles.username}>{username}</div>
                    <div className={styles.horizontal}>
                        <div className={styles.user_point}>Status:</div>
                        <div className={styles.user_point_text}>{status}</div>
                    </div>
                    <div className={styles.horizontal}>
                        <div className={styles.user_point}>Company:</div>
                        <div className={styles.user_point_text}>{company}</div>
                    </div>
                </div>
            </div>
            <div className={styles.button_details}>{details}</div>
            <div className={styles.horizontal}>
                <button className={classNames(styles.button_communicate, styles.button_common)}
                        onClick={onCommunicateClick}>
                    Communicate
                </button>
                <button className={classNames(styles.button_unban, styles.button_common)}
                        onClick={onUnbanClick}>
                    Unban
                </button>
                <button className={classNames(styles.button_ban, styles.button_common)}
                        onClick={onBanClick}>
                    Ban
                </button>
            </div>
        </div>
    );
}

export default AdminUserCard;
