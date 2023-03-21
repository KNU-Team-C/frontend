import React from 'react';
import styles from './styles.module.sass';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import classNames from "../../commons/classnames";

const SignUpPage = () => {
	return (
		<div className={styles.signup_container}>
				<input type="email" id = "email" className={styles.input} placeholder="Email"/>
				<input type="password" className={styles.input} placeholder="Password" />
				<Link to="/signup/continue">
				<button className={styles.signup_button}>Create account</button>
				</Link>
				<p className={styles.message}>Already have an account?{' '}<Link to="/signin">Sign in</Link></p>
				<p name="errorMessage" className={classNames(styles.message, styles.error)}>Example: That email and password combination is incorrect.</p>
		</div>
	);
}

export default SignUpPage;