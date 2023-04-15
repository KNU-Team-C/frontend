import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import styles from './styles.module.sass';


const AddCompanyModal = ({ open, setOpen }) => {
	return (
		<Modal
			dimmer={'blurring'}
			open={open}
			className={styles.modal}
		>
			<Modal.Header className={styles.header}>Add Company</Modal.Header>
			<Modal.Content className={styles.content} scrolling>
				<div className={styles.input_field}>
					<input id="name" type="text" required />
					<label htmlFor="name">Company Name</label>
				</div>
				<div className={styles.input_field}>
					<input id="email" type="text" required />
					<label htmlFor="email">Email</label>
				</div>
				<div className={styles.input_field}>
					<input id="location" type="text" required />
					<label htmlFor="location">Location</label>
				</div>
				<div className={styles.input_field}>
					<input id="address" type="text" required />
					<label htmlFor="address">Address</label>
				</div>
				<div className={styles.input_field}>
					<input id="num-of-employees" type="text" required />
					<label htmlFor="num-of-employees">Number of Employees</label>
				</div>
				<textarea className={styles.input_area} placeholder="Desription (optional)"/>
			</Modal.Content>
			<Modal.Actions className={styles.actions}>
				<Button negative onClick={() => setOpen(false)}>
					Cancel
				</Button>
				<Button positive onClick={() => {
					setOpen(false);
				}}>
					Save
				</Button>
			</Modal.Actions>
		</Modal>
	);
}

export default AddCompanyModal;