import React from 'react';
import AdminUserCard from "../AdminUserCard";
import styles from "./styles.module.sass";


const AdminRequestUserCard = (props) => {
    const {typeOfRequest} = props;
    return (
        <AdminUserCard {...props}
                       header={
                           (<div className={styles.horizontal}>
                               <div className={styles.type_of_request_title}>Type of Request:</div>
                               <div className={styles.type_of_request_text}>{typeOfRequest}</div>
                           </div>)
                       }
        />
    );
}

export default AdminRequestUserCard;
