import React, { useState } from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';
import styles from './styles.module.sass';
import { emailRegex, validate } from '../../../helpers/validation.helper';


const AddCompanyModal = ({ open, setOpen, addCompany, companyLoading }) => {

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [location, setLocation] = useState('');
	const [address, setAddress] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [numOfEmployees, setNumOfEmployees] = useState('');
	const [description, setDescription] = useState('');

	const [errors, setErrors] = useState([]);

	const validateData = () => {
		const errorFields = [];

		if (!validate(email, emailRegex, true)) {
			errorFields.push('email');
		}

		checkEmpty(name, 'name', errorFields);
		checkEmpty(location, 'location', errorFields);
		checkEmpty(address, 'address', errorFields);
		checkEmpty(phoneNumber, 'phone-number', errorFields);
		checkEmpty(numOfEmployees, 'num-of-employees', errorFields);

		if (errorFields.length > 0) {
			setErrors(errorFields);
			return false;
		}

		return true;
	}

	const checkEmpty = (field, name, errorFields) => {
		if (!field) {
			errorFields.push(name);
		}
	}

	const onNumericFieldChange = (e, setValue) => {
		const re = /^[0-9\b]+$/;
		if (e.target.value === '' || re.test(e.target.value)) {
			setValue(e.target.value);
		}
	}

	const removeError = (field) => {
		if (errors.includes(field)) {
			setErrors(errors.filter(e => e !== field));
		}
	}

	const setInput = (e, field, setValue) => {
		removeError(field);
		setValue(e.target.value);
	}

	const isInvalid = (field) => {
		return errors.includes(field);
	}

	return (
		<Modal
			dimmer={'blurring'}
			open={open}
			className={styles.modal}
		>
			<Modal.Header className={styles.header}>Add Company</Modal.Header>
			<Modal.Content className={styles.content} scrolling>
				<div className={styles.input_field}>
					<input
						id="name"
						type="text"
						required
						value={name}
						className={isInvalid('name') ? styles.input_invalid : ''}
						onChange={(e) => setInput(e, 'name', setName)} />
					<label htmlFor="name">Company Name</label>
					{isInvalid('name') && <Icon className={styles.invalid_icon} name='warning' />}
				</div>
				<div className={styles.input_field}>
					<input
						id="email"
						type="text"
						required
						value={email}
						className={isInvalid('email') ? styles.input_invalid : ''}
						onChange={(e) => setInput(e, 'email', setEmail)} />
					<label htmlFor="email">Email</label>
					{isInvalid('email') && <Icon className={styles.invalid_icon} name='warning' />}
				</div>
				<div className={styles.input_field}>
					<input
						id="phone-number"
						type="text"
						pattern='[0-9\b]+'
						required
						maxLength={15}
						value={phoneNumber}
						className={isInvalid('phone-number') ? styles.input_invalid : ''}
						onChange={(e) => {
							removeError('phone-number');
							onNumericFieldChange(e, setPhoneNumber);
						}} />
					<label htmlFor="phone-number">Phone Number</label>
					{isInvalid('phone-number') && <Icon className={styles.invalid_icon} name='warning' />}
				</div>
				<div className={styles.input_field}>
					<input
						id="location"
						type="text"
						required
						value={location}
						className={isInvalid('location') ? styles.input_invalid : ''}
						onChange={(e) => setInput(e, 'location', setLocation)} />
					<label htmlFor="location">Location</label>
					{isInvalid('location') && <Icon className={styles.invalid_icon} name='warning' />}
				</div>
				<div className={styles.input_field}>
					<input
						id="address"
						type="text"
						required
						value={address}
						className={isInvalid('address') ? styles.input_invalid : ''}
						onChange={(e) => setInput(e, 'address', setAddress)} />
					<label htmlFor="address">Headquarters Address</label>
					{isInvalid('address') && <Icon className={styles.invalid_icon} name='warning' />}
				</div>
				<div className={styles.input_field}>
					<input
						id="num-of-employees"
						type="text"
						required
						maxLength={15}
						value={numOfEmployees}
						className={isInvalid('num-of-employees') ? styles.input_invalid : ''}
						onChange={(e) => {
							removeError('num-of-employees');
							onNumericFieldChange(e, setNumOfEmployees);
						}}
					></input>
					<label htmlFor="num-of-employees">Number of Employees</label>
					{isInvalid('num-of-employees') && <Icon className={styles.invalid_icon} name='warning' />}
				</div>
				<textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className={styles.input_area} placeholder="Description (optional)" />
			</Modal.Content>
			<Modal.Actions className={styles.actions}>
				<Button negative onClick={() => setOpen(false)}>
					Cancel
				</Button>
				<Button positive loading={companyLoading} onClick={() => {
					if (!validateData()) {
						return;
					}
					setOpen(false);
					addCompany({
						name,
						email,
						address,
						location,
						phoneNumber,
						employeesNum: numOfEmployees,
						description: description
					});
				}}>
					Save
				</Button>
			</Modal.Actions>
		</Modal>
	);
}

export default AddCompanyModal;