import React from 'react';
import GenericCard from '../GenericCard';
import {history} from '../../helpers/history.helper';

const CompanyCard = (props) => {
	const {
		id,
		companyName,
		image,
		status,
		industries,
		technologies,
		details
	} = props;

	const infoItems = [{
		title: 'Status',
		content: status,
	}, {
		title: 'Industries',
		content: industries
	}, {
		title: 'Technologies',
		content: technologies
	}
	];

	return (
		<GenericCard
			itemHeader={companyName}
			image={image}
			infoItems={infoItems}
			details={details}
			onCardClick={() => history.push(`/company/${id}`)}
		/>
	);
}

export default CompanyCard;