import React, { useState, useEffect } from 'react';
import styles from './styles.module.sass';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { signUpRoutine } from './routines';
import { toastr } from 'react-redux-toastr';
import { emailRegex, passwordRegex, validate } from '../../helpers/validation.helper';

const SignUpPage = ({ loading, signUp }) => {
	const [page, setPage] = useState(0);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');


	const toNextPage = () => {
		if (email === '' || password === '') {
			return;
		}
		if (!validate(email, emailRegex, true)) {
			toastr.error('Invalid email', 'Please make sure that the provided email is valid');
			return;
		}
		if (!validate(password, passwordRegex, false)) {
			toastr.error('Invalid password', 'Please make sure that the provided password has ' +
				'lowercase and uppercase letter, a digit, a special character, and the min length of 6 characters');
			return;
		}
		setPage(1);
	}

	const validateData = () => {
		const invalidError = (field) => toastr.error(`Invalid ${field}`, `Please provide a valid ${field} to proceed`);
		if (firstName === '') {
			invalidError('first name');
			return false;
		}
		if (lastName === '') {
			invalidError('last name');
			return false;
		}
		if (phoneNumber === '') {
			invalidError('phone number');
			return false;
		}
		return true;
	}

	const handleSignUp = () => {
		if (!validateData()) {
			return;
		}
		signUp({ firstName, lastName, email, password, phoneNumber });
	}

	const onPhoneNumberChange = (e) => {
		const re = /^[0-9\b]+$/;
		if (e.target.value === '' || re.test(e.target.value)) {
			setPhoneNumber(e.target.value);
		}
	}

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [page])

	const pages = [
		(
			<div className={styles.signup_container} key="0">
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
				<button className={styles.signup_button} onClick={() => toNextPage()}>Create account</button>
				<p className={styles.message}>Already have an account?{' '}<Link to="/signin">Sign in</Link></p>
			</div>
		),
		<div className={styles.signup_container} key="1">
			<input
				name="firstName"
				type="text"
				className={styles.input}
				placeholder="First name"
				onChange={(e) => setFirstName(e.target.value)} />
			<input
				type="text"
				name="secondName"
				className={styles.input}
				placeholder="Last name"
				onChange={(e) => setLastName(e.target.value)} />
			<input
				type="text"
				name="phoneNumber"
				value={phoneNumber}
				maxLength={15}
				className={styles.input}
				placeholder="Phone number"
				onChange={(e) => onPhoneNumberChange(e)} />
			<textarea className={styles.big_input} placeholder="Desription (optional)" />
			<Button loading={loading} className={styles.signup_button} onClick={() => handleSignUp()}>Create account</Button>
			<p className={styles.message}>Already have an account?{' '}<Link to="/signin">Sign in</Link></p>
		</div>
	]

	return pages[page];
}

const mapStateToProps = (state) => ({
	loading: state.authData.loading,
});

const mapDispatchToProps = {
	signUp: signUpRoutine
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);