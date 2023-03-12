import React from 'react';
import styles from './styles.module.sass';
import {Card} from "semantic-ui-react";
import classNames from "../../commons/classnames";


const AdminCompanyCard = (props) => {
    const {
        header,
        companyName,
        image,
        status,
        industries,
        technologies,
        details,
        onCommunicateClick,
        onVerifyClick,
        onDeclineClick
    } = props;
    return (
        <Card.Group itemsPerRow={1}>
            <Card>
                <div className={styles.vertical}>
                    {header}
                    <div className={styles.horizontal}>
                        <div>
                            <img src={image} className={styles.request_image} alt={'company image'}/>
                        </div>
                        <div className={styles.vertical}>
                            <div className={styles.company_name}>{companyName}</div>
                            <div className={styles.horizontal}>
                                <div className={styles.request_point}>Status:</div>
                                <div className={styles.default_text}>{status}</div>
                            </div>
                            <div className={styles.horizontal}>
                                <div className={styles.request_point}>Industries:</div>
                                <div className={styles.default_text}>{industries}</div>
                            </div>
                            <div className={styles.horizontal}>
                                <div className={styles.request_point}>Technologies:</div>
                                <div className={styles.default_text}>{technologies}</div>
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
                             onClick={onVerifyClick}>
                            Verify
                        </button>
                        <button className={classNames(styles.button_ban, styles.button_common)}
                             onClick={onDeclineClick}>
                            Decline
                        </button>
                    </div>
                </div>
            </Card>
        </Card.Group>
    );
}

export default AdminCompanyCard;
