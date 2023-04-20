import React, { useState, useEffect } from 'react';
import ScreenLoader from '../../components/ScreenLoader';
import styles from './styles.module.sass';
import { getProjectRoutine, modifyProjectRoutine, uploadImageRoutine } from './routines';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import classNames from '../../commons/classnames';
import placeholder from '../../assets/image-placeholder.png';
import loader from '../../assets/loader.gif';

const ProjectPage = ({
	own,
	loading,
	project,
	getProject,
	imageLoading,
	uploadImage,
	modifyProject,
}) => {

	const { id } = useParams();
	const [edit, setEdit] = useState(false);
	const [description, setDescription] = useState(project.description);
	const [title, setTitle] = useState(project.title);
	const [url, setUrl] = useState(project.url);

	const toStr = (list) => {
		const str = list.map(ind => ind.name).join(', ');
		return str === '' ? '-' : str;
	}

	const editStyles = () => {
		return edit ? styles.editable : styles.disabled
	}

	const cancel = () => {
		setDescription(project.description);
		setTitle(project.title);
		setUrl(project.url);
		setEdit(false);
	}

	const save = () => {
		modifyProject({ id, title, url, description });
		setEdit(false);
	}

	useEffect(() => {
		getProject(id);
	}, [id]);

	useEffect(() => {
		setDescription(project.description);
		setTitle(project.title);
		setUrl(project.url);
	}, [project]);

	return <div className={styles.project_container}>
		{loading ? <ScreenLoader /> : (
			<div className={styles.main_row}>
				<div className={styles.left_column}>
					<div className={styles.centered}>
						<img className={styles.project_img}
							src={imageLoading ? loader : project.logo || placeholder} />
						{own && <label className={styles.custom_file_input}>
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
				</div>
				<div className={styles.right_column}>
					<input
						disabled={!edit}
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className={classNames(styles.header, editStyles())}
					/>
					{!edit && <a
						className={styles.project_url}
						target="_blank"
						rel="noopener noreferrer"
						href={url}
					>
						{url}
					</a>}
					{edit && <input
						type="url"
						size="30"
						disabled={!edit}
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						className={classNames(editStyles())}
					/>}
					<div className={styles.info_row}>
						<label className={styles.label_text_2}>Industries: </label>
						<label id='industries_label' className={styles.label_text}> {toStr(project.industries)}</label>
					</div>
					<div className={styles.info_row}>
						<label className={styles.label_text_2}>Technologies: </label>
						<label id='technologies_label' className={styles.label_text}>
							{toStr(project.technologies)}
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
						{own && !edit &&
							<button className={styles.btn} onClick={() => setEdit(true)}>Edit</button>}
						{own && edit &&
							<button className={styles.btn} onClick={() => save()}>Save</button>}
						{own && edit &&
							<button className={styles.btn_reverted} onClick={() => cancel()}>Cancel</button>}
					</div>
				</div>

			</div >)};
	</div>
}

const mapStateToProps = (state) => ({
	project: state.projectData.project,
	loading: state.projectData.loading,
	imageLoading: state.projectData.imageLoading,
});

const mapDispatchToProps = {
	getProject: getProjectRoutine,
	modifyProject: modifyProjectRoutine,
	uploadImage: uploadImageRoutine,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);