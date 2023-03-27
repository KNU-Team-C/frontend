import React from 'react';
import styles from './styles.module.sass';
import { connect } from 'react-redux';
import logo from '../../../assets/logo-small.png';
import { Dropdown, Icon } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import { TOKEN_NAME } from '../../../commons/constants';
import { clearToken } from '../../../helpers/token.helper';
import { history } from '../../../helpers/history.helper';

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
                    <div className={styles.logo_text}>Optimum Portfolio</div>
                </Link>
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
                {authenticated && <Dropdown className={styles.user_dropdown} icon={null}
                    trigger={
                        <Icon
                            link
                            name='user'
                            size='large'
                        />
                    }>
                    <Dropdown.Menu className={styles.user_dropdown_menu} direction='left'>
                        <Dropdown.Item icon='setting' content='Settings' />
                        <Dropdown.Divider />
                        <Dropdown.Item icon='sign out' text='Sign out' onClick={() => {
                            clearToken();
                            history.push('/');
                        }} />
                    </Dropdown.Menu>
                </Dropdown>}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    userId: state.authData.id,
});

export default connect(mapStateToProps)(Header);
