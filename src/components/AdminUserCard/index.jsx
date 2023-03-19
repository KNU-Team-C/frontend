import React from 'react';
import styles from './styles.module.sass';
import GenericCard from '../GenericCard';


const AdminUserCard = (props) => {
    const {
        username,
        image,
        status,
        header,
        details,
        onCommunicateClick,
        onUnbanClick,
        onBanClick
    } = props;

    const infoItems = [{
        title: 'Status',
        content: status
    }];

    const cardControls = [{
        text: 'Communicate',
        className: styles.button_communicate,
        onClick: onCommunicateClick
    }, {
        text: 'Unban',
        className: styles.button_unban,
        onClick: onUnbanClick
    }, {
        text: 'Ban',
        className: styles.button_ban,
        onClick: onBanClick
    }];

    return (
        <GenericCard
            cardHeader={header}
            itemHeader={username}
            image={image}
            infoItems={infoItems}
            details={details}
            controls={cardControls}
        />
    );
}

export default AdminUserCard;
