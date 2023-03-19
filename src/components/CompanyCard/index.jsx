import React from 'react';
import GenericCard from '../GenericCard';

const CompanyCard = (props) => {
	const {
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
		/>
	);
}

export default CompanyCard;