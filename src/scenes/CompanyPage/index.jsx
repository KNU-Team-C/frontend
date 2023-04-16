import React, { useState, useEffect } from 'react';
import ScreenLoader from '../../components/ScreenLoader';
import { USER_ID } from '../../commons/constants';
import styles from './styles.module.sass';
import { getCompanyRoutine, modifyCompanyRoutine, uploadImageRoutine } from './routines';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import classNames from '../../commons/classnames';
import mailIco from '../../assets/mail_ico.png';
import phoneIco from '../../assets/phone_ico.png';
import { validate, emailRegex } from '../../helpers/validation.helper';
import { history } from '../../helpers/history.helper';
import { toastr } from 'react-redux-toastr';
import placeholder from '../../assets/image-placeholder.png';
import loader from '../../assets/loader.gif';

const CompanyPage = ({
	loading,
	company,
	getCompany,
	modifyCompany,
	imageLoading,
	uploadImage,
}) => {

	const { id } = useParams();
	const [edit, setEdit] = useState(false);
	const [description, setDescription] = useState(company.description);
	const [name, setName] = useState(company.name);
	const [location, setLocation] = useState(company.location);
	const [address, setAddress] = useState(company.address);
	const [phoneNumber, setPhoneNumber] = useState(company.phoneNumber);
	const [email, setEmail] = useState(company.email);

	const toStr = (list) => {
		const str = list.map(ind => ind.name).join(', ');
		return str === '' ? '-' : str;
	}

	const editStyles = () => {
		return edit ? styles.editable : styles.disabled
	}

	const cancel = () => {
		setDescription(company.description);
		setName(company.name);
		setLocation(company.location);
		setAddress(company.address);
		setPhoneNumber(company.phoneNumber);
		setEmail(company.email);
		setEdit(false);
	}

	const save = () => {
		if (!validate(email, emailRegex, true)) {
			toastr.error('Invalid email', 'Please make sure that the provided email is valid');
			return false;
		}
		modifyCompany({ id: company.id, name, description, address, location, email, phoneNumber });
		setEdit(false);
	}

	const onPhoneNumberChange = (e) => {
		const re = /^[0-9\b]+$/;
		if (e.target.value === '' || re.test(e.target.value)) {
			setPhoneNumber(e.target.value);
		}
	}

	const ownCompany = company.user == localStorage.getItem(USER_ID);

	useEffect(() => {
		getCompany(id);
	}, [id]);

	useEffect(() => {
		setDescription(company.description);
		setName(company.name);
		setLocation(company.location);
		setAddress(company.address);
		setPhoneNumber(company.phoneNumber);
		setEmail(company.email);
	}, [company]);

	return <div className={styles.company_container}>
		{loading ? <ScreenLoader /> : (
			<div className={styles.main_row}>
				<div className={styles.left_column}>
					<div className={styles.centered}>
						<img className={styles.company_img} src={imageLoading ? loader : company.logo || placeholder} />
						{ownCompany && <label className={styles.custom_file_input}>
							<input
								type="file"
								onChange={(e) => {
									const f = e.target.files[0];
									console.log('UPLOADING IMAGE', f);
									uploadImage({
										id,
										image: f
									});
								}} />
							<span>Upload image</span>
						</label>}
					</div>
					<div className={styles.info_row}>
						<img className={styles.ico_view} src={mailIco} />
						<input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className={classNames(styles.info_row_input, editStyles())} />
					</div>
					<div className={styles.info_row}>
						<img className={styles.ico_view} src={phoneIco} />
						<input
							value={phoneNumber}
							maxLength={15}
							onChange={(e) => onPhoneNumberChange(e)}
							className={classNames(styles.info_row_input, editStyles())} />
					</div>
				</div>
				<div className={styles.right_column}>
					<input
						disabled={!edit}
						value={name}
						onChange={(e) => setName(e.target.value)}
						className={classNames(styles.header, editStyles())}
					/>
					<input
						disabled={!edit}
						value={location}
						onChange={(e) => setLocation(e.target.value)}
						className={classNames(styles.header2, editStyles())}
					/>
					<input
						disabled={!edit}
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						className={classNames(styles.info_row_input, editStyles())}
					/>
					<div className={styles.info_row}>
						<label className={styles.label_text_2}>Industries: </label>
						<label id='industries_label' className={styles.label_text}> {toStr(company.industries)}</label>
					</div>
					<div className={styles.info_row}>
						<label className={styles.label_text_2}>Technologies: </label>
						<label id='technologies_label' className={styles.label_text}>
							{toStr(company.technologies)}
						</label>
					</div>
					<div className={styles.info_row}>
						<textarea
							disabled={!edit}
							type={"text"}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className={classNames(styles.info_row_input, styles.description_input, editStyles())} />
					</div>
					<div className={styles.info_row}>
						{ownCompany && !edit &&
							<button className={styles.btn} onClick={() => setEdit(true)}>Edit</button>}
						{ownCompany && edit &&
							<button className={styles.btn} onClick={() => save()}>Save</button>}
						{ownCompany && edit &&
							<button className={styles.btn_reverted} onClick={() => cancel()}>Cancel</button>}
						<button className={styles.btn} onClick={() => history.push(`/company/${id}/projects`)}>View Projects</button>
					</div>
				</div>

			</div >)};
	</div>
}

const mapStateToProps = (state) => ({
	company: state.companyData.company,
	loading: state.companyData.loading,
	imageLoading: state.companyData.imageLoading,
});

const mapDispatchToProps = {
	getCompany: getCompanyRoutine,
	modifyCompany: modifyCompanyRoutine,
	uploadImage: uploadImageRoutine,
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyPage);