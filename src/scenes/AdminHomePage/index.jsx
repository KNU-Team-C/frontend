import React from 'react';
import {Link} from 'react-router-dom/cjs/react-router-dom';
import styles from './styles.module.sass';
import AdminUserCard from "../../components/AdminUserCard";

const AdminHomePage = () => {
    return (
        <div className={styles.home_container}>
            <Link to="/search">
                <div className={styles.main_options}>
                    <div className={`${styles.glow_on_hover} ${styles.search_btn}`}>Search Companies</div>
                </div>
            </Link>
            <AdminUserCard username={'Test username'} status={'test status'} company={'test ompany'}/>
        </div>
    );
}


export default AdminHomePage;