import React from 'react';
import styles from './styles.module.sass';
import logo from '../../assets/logo-small.png';
import { Link, useLocation } from 'react-router-dom';
import { TOKEN_NAME } from '../../commons/constants';

const excludeControls = ['/signin', '/signup']

const Header = () => {

    const location = useLocation();
    const authenticated = localStorage.getItem(TOKEN_NAME);
    const renderControls = () => !excludeControls.includes(location.pathname) && !authenticated;

    return (
        <div className={styles.header_container}>
            <div className={styles.logo_container}>
                <Link to="/">
                    <img className={styles.logo_img} src={logo} alt="Optimum Portfolio logo" />
                </Link>
                <div className={styles.logo_text}>Optimum Portfolio</div>
            </div>
            <div className={styles.controls_container}>
                <Link to="/companies">
                    <div className={styles.item}>Companies</div>
                </Link>
                {renderControls() && <Link to="/signin">
                    <div className={`${styles.item} ${styles.sign_in}`}>Sign in</div>
                </Link>}
                {renderControls() && <Link to="/signup">
                    <div className={`${styles.item} ${styles.sign_up}`}>Sign up</div>
                </Link>}
            </div>
        </div>
    );
}

export default Header;
