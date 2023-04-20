import React from 'react';
import GenericCard from '../GenericCard';
import styles from './styles.module.sass';
import { history } from '../../helpers/history.helper';

const ProjectCard = (props) => {
	const {
		own,
		id,
		title,
		image,
		companyName,
		companyId,
		industries,
		technologies,
		description
	} = props;

	const infoItems = [
		{
			title: 'Industries',
			content: industries
		}, {
			title: 'Technologies',
			content: technologies
		}
	];

	const subHeader = () => {
		return (
			<div className={styles.company_button}>
				<button onClick={() => history.push(`/company/${companyId}`)}>
					{companyName}
				</button>
			</div>);
	}

	return (
		<GenericCard
			itemHeader={title}
			image={image}
			infoItems={infoItems}
			details={description}
			subHeader={subHeader()}
			onCardClick={() => {
				if (own) {
					history.push(`/own-project/${id}`);
				} else {
					history.push(`/project/${id}`);
				}
			}}
		/>
	);
}

export default ProjectCard;