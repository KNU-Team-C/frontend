import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import work1 from '../../assets/work1.png'
import work2 from '../../assets/work2.png'
import styles from './styles.module.sass';

const LandingPage = () => (
    <div className={styles.landing_container}>
        <div className={styles.intro_container}>
            <img className={styles.intro_img1} src={work1} />
            <div className={styles.intro_text}>
                <h1>Share your company’s projects</h1>
                <p>Showcase your best creations with just one click. Generate customized portfolios depending on users needs</p>
                <Link to="/search">
                    <div className={styles.explore_button}>Explore Now!</div>
                </Link>
            </div>
        </div>
        <div className={styles.intro_container}>
            <div className={styles.intro_text}>
                <h1>Spend your time efficiently</h1>
                <p>Fill in the data once and reuse it multiple times to compose different sets. You manage your projects while we manage their promotion</p>
                <Link to="/search">
                    <div className={styles.explore_button}>Explore Now!</div>
                </Link>
            </div>
            <img className={styles.intro_img2} src={work2} />
        </div>
    </div>
);

export default LandingPage;
