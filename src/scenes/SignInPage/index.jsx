import React, { useState } from 'react';
import styles from './styles.module.sass';
import classNames from "../../commons/classnames";
import { toastr } from 'react-redux-toastr';
import { connect } from 'react-redux';
import { signInRoutine } from './routines';
import { Button } from 'semantic-ui-react';
import { validate, emailRegex } from '../../helpers/validation.helper';
import { Link } from 'react-router-dom';

const SignInPage = ({ loading, signIn }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onSignIn = () => {
		if (!validate(email, emailRegex, true)) {
			toastr.error('Invalid email', 'Please make sure that the provided email is valid');
			return;
		}
		if (password === '') {
			return;
		}
		signIn({email, password});
	}

	return (
		<div className={styles.signin_container}>
			<input
				id="email"
				type="email"
				className={styles.input}
				placeholder="Email"
				onChange={(e) => setEmail(e.target.value)} />
			<input
				id="password"
				type="password"
				className={styles.input}
				placeholder="Password"
				onChange={(e) => setPassword(e.target.value)} />
			<Button loading={loading} className={styles.signin_button} onClick={() => onSignIn()}>Sign in</Button>
			<p className={styles.message}>Do not have an account?{' '}<Link to="/signup">Sign up</Link></p>
			<p name="errorMessage" className={classNames(styles.message, styles.error)}>Example: That email and password combination is incorrect.</p>
		</div>
	);
}

const mapStateToProps = (state) => ({
	loading: state.authData.loading,
});

const mapDispatchToProps = {
	signIn: signInRoutine
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);