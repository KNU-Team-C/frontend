import React from 'react';
import styles from './styles.module.sass';


const Footer = () => {
    return (
        <div className={styles.footer_container}>
            <a href="mailto:anna.alieksieienko@knu.ua?subject=Optimum Portfolio Question" className={styles.footer_item}>Contact Us</a>
        </div>
    );
}

export default Footer;
