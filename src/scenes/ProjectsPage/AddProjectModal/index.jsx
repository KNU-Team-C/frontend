import React, { useState } from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';
import styles from './styles.module.sass';


const AddProjectModal = ({ companyId, open, setOpen, addProject, projectLoading }) => {

	const [title, setTitle] = useState('');
	const [url, setUrl] = useState('');
	const [description, setDescription] = useState('');

	const [errors, setErrors] = useState([]);

	const validateData = () => {
		const errorFields = [];

		checkEmpty(title, 'title', errorFields);

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
			<Modal.Header className={styles.header}>Add Project</Modal.Header>
			<Modal.Content className={styles.content} scrolling>
				<div className={styles.input_field}>
					<input
						id="title"
						type="text"
						required
						value={title}
						className={isInvalid('title') ? styles.input_invalid : ''}
						onChange={(e) => setInput(e, 'title', setTitle)} />
					<label htmlFor="title">Project Title</label>
					{isInvalid('title') && <Icon className={styles.invalid_icon} name='warning' />}
				</div>
				<div className={styles.input_field}>
					<input
						id="url"
						type="text"
						required
						value={url}
						onChange={(e) => setUrl(e.target.value)} />
					<label htmlFor="url">Project URL (Optional)</label>
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
				<Button positive loading={projectLoading} onClick={() => {
					if (!validateData()) {
						return;
					}
					setOpen(false);
					addProject({
						companyId,
						title,
						url,
						description,
					});
				}}>
					Save
				</Button>
			</Modal.Actions>
		</Modal>
	);
}

export default AddProjectModal;