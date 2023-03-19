import React from 'react';
import styles from './styles.module.sass';
import AdminCompanyCard from "../AdminCompanyCard";


const AdminRequestCompanyCard = (props) => {
    const { typeOfRequest } = props;
    return (
        <AdminCompanyCard {...props}
            header={
                <div className={styles.type_of_request_container}>
                    <div className={styles.type_of_request_title}>Type of Request:</div>
                    <div className={styles.type_of_request_text}>{typeOfRequest}</div>
                </div>
            }
        />
    );
}

export default AdminRequestCompanyCard;
