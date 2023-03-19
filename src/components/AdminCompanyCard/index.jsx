import React from 'react';
import styles from './styles.module.sass';
import GenericCard from '../GenericCard';


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

    const infoItems = [{
        title: 'Status',
        content: status,
    }, {
        title: 'Industries',
        content: industries
    }, {
        title: 'Technologies',
        content: technologies
    }
    ];

    const cardControls = [{
        text: 'Communicate',
        className: styles.button_communicate,
        onClick: onCommunicateClick
    }, {
        text: 'Verify',
        className: styles.button_unban,
        onClick: onVerifyClick
    }, {
        text: 'Decline',
        className: styles.button_ban,
        onClick: onDeclineClick
    }
    ];
    return (
        <GenericCard
            cardHeader={header}
            itemHeader={companyName}
            image={image}
            infoItems={infoItems}
            details={details}
            controls={cardControls}
        />
    );
}

export default AdminCompanyCard;
