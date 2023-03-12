import React from 'react';
import styles from './styles.module.sass';
import {Card} from "semantic-ui-react";
import classNames from "../../commons/classnames";


const AdminUserCard = (props) => {
    const {
        username,
        status,
        company,
        header,
        details,
        onCommunicateClick,
        onUnbanClick,
        onBanClick
    } = props;
    return (
        <Card.Group itemsPerRow={1}>
            <Card>
                <div className={styles.vertical}>
                    {header}
                    <div className={styles.horizontal}>
                        <div>
                            <img className={styles.user_image}/>
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
                        <div className={classNames(styles.button_communicate, styles.button_common)}
                             onClick={onCommunicateClick}>
                            Communicate
                        </div>
                        <div className={classNames(styles.button_unban, styles.button_common)}
                             onClick={onUnbanClick}>
                            Unban
                        </div>
                        <div className={classNames(styles.button_ban, styles.button_common)}
                             onClick={onBanClick}>
                            Ban
                        </div>
                    </div>
                </div>
            </Card>
        </Card.Group>
    );
}

export default AdminUserCard;
