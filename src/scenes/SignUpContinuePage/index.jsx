import React from 'react';
import styles from './styles.module.sass';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const handleClick = (e) => {
	e.preventdefault()
}

const SignUpContinuePage = () => {
	return (
		<div className={styles.signup_container}>
			<input type="text" name = "firstName" className={styles.input} placeholder="First name"/>
			<input type="text" name = "secondName" className={styles.input} placeholder="Second name"/>
			<input type="text" name = "phoneNumber" className={styles.input} placeholder="Phone number"/>
			<textarea className={styles.big_input} placeholder="Desription (optional)"/>
			<button className={styles.signup_button} onClick = {handleClick}>Create account</button>
			<p className={styles.message}>Already have an account?{' '}<Link to="/signin">Sign in</Link></p>
		</div>
	);
}

export default SignUpContinuePage;