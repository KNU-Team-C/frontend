import React from 'react';
import styles from './styles.module.sass';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import classNames from "../../commons/classnames";

const handleClick = (e) => {
	e.preventdefault()
}

const SignInPage = () => {
	return (
		<div className={styles.signin_container}>
				<input type="email" id = "email" className={styles.input} placeholder="Email"/>
				<input type="password" className={styles.input} placeholder="Password" />
				<button className={styles.signin_button} onClick = {handleClick}>Sign in</button>
				<p className={styles.message}>Do not have an account?{' '}<Link to="/signup">Sign up</Link></p>
				<p name="errorMessage" className={classNames(styles.message, styles.error)}>Example: That email and password combination is incorrect.</p>
				<script>
					
				</script>
		</div>
	);
}

export default SignInPage;