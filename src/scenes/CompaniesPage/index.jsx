import React, { useEffect, useState } from 'react';
import { Loader } from 'semantic-ui-react';
import TagFilter from '../../components/TagFilter';
import Tag from '../../components/Tag';
import SearchField from '../../components/SearchField';
import styles from './styles.module.sass';
import CompanyCard from '../../components/CompanyCard';
import classNames from '../../commons/classnames';
import emptyListImage from '../../assets/empty-list.png';
import { connect } from 'react-redux';
import AddCompanyModal from './AddCompanyModal';
import { addCompanyRoutine, getCompaniesRoutine, getIndustriesRoutine, getTechnologiesRoutine } from './routines';

const CompaniesPage = ({
	own,
	companiesLoading,
	technologiesLoading,
	industriesLoading,
	addCompanyLoading,
	companies,
	industries,
	technologies,
	getCompanies,
	getIndustries,
	getTechnologies,
	addCompany,
}) => {

	useEffect(() => {
		getCompanies({ own });
		getIndustries();
		getTechnologies();
	}, []);

	const [searchText, setSearchText] = useState(''); // input text before clicking on search
	const [currentText, setCurrentText] = useState(searchText); // text with which the results are filtered
	const [selectedIndustries, setSelectedIndustries] = useState([]);
	const [selectedTechnologies, setSelectedTechnologies] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);

	const searchCompanies = () => {
		setCurrentText(searchText);
		getCompanies({
			own,
			query: searchText,
			industries: selectedIndustries,
			technologies: selectedTechnologies
		});
	}

	const addOrRemoveIfPresent = (id, values) => {
		return values.includes(id) ? [...values.filter(v => v !== id)] : [...values, id];
	}

	return (
		<div className={styles.companies_container}>
			{own && <AddCompanyModal
				open={modalOpen}
				setOpen={setModalOpen}
				addCompany={addCompany}
				companyLoading={addCompanyLoading} />}
			{own && <button
				className={styles.create_company_btn}
				onClick={() => setModalOpen(true)}
			>+</button>}
			<div className={classNames(styles.vertical, styles.filters)}>
				<TagFilter
					className={styles.tag_filter}
					title={'Industries'}
					onReset={() => {
						setSelectedIndustries([]);
						getCompanies({ own, industries: [], selectedTechnologies, query: currentText });
					}}
					onInput={(e) => {
						getIndustries({ query: e.target.value });
					}}
				>
					<Loader active={industriesLoading} inline />
					{industries.map(ind => (
						<Tag key={ind.id}
							isSelected={selectedIndustries.includes(ind.id)}
							onSelectionChange={() => {
								const ids = addOrRemoveIfPresent(ind.id, selectedIndustries);
								setSelectedIndustries(ids);
								getCompanies({ own, query: currentText, industries: ids, technologies: selectedTechnologies });
							}}
							text={ind.name}
							amount={''}
						/>
					))}
				</TagFilter>
				<TagFilter
					className={styles.tag_filter}
					title={'Technologies'}
					onReset={() => {
						setSelectedTechnologies([]);
						getCompanies({ own, industries: selectedIndustries, technologies: [], query: currentText });
					}}
					onInput={(e) => {
						getTechnologies({ query: e.target.value });
					}}>
					<Loader active={technologiesLoading} inline />
					{technologies.map(tech => (
						<Tag key={tech.id}
							isSelected={selectedTechnologies.includes(tech.id)}
							onSelectionChange={() => {
								const ids = addOrRemoveIfPresent(tech.id, selectedTechnologies);
								setSelectedTechnologies(ids);
								getCompanies({ own, query: currentText, industries: selectedIndustries, technologies: ids });
							}}
							text={tech.name}
							amount={''}
						/>
					))}
				</TagFilter>
			</div>
			<div className={classNames(styles.vertical, styles.search_container)}>
				<SearchField
					className={styles.search_margin}
					onInput={(e) => setSearchText(e.target.value)}
					onSearchClick={() => searchCompanies()} />
				<Loader active={companiesLoading} inline />
				{!companiesLoading && companies.length === 0 && <>
					<img src={emptyListImage} className={styles.placeholder_image} />
					<p className={styles.placeholder_text}>No results found ...</p>
				</>}
				{companies.map(c => (
					<CompanyCard
						key={c.id}
						id={c.id}
						companyName={c.name}
						image={c.logo}
						status={c.isVerified ? 'Verified' : 'Not verified'}
						industries={c.industries.map(i => i.name)}
						technologies={c.technologies.map(t => t.name)}
						details={c.description}
					/>
				))}
			</div>
		</div >
	);
}

const mapStateToProps = (state) => ({
	companies: state.companiesData.companies,
	industries: state.companiesData.industries,
	technologies: state.companiesData.technologies,
	companiesLoading: state.companiesData.companiesLoading,
	industriesLoading: state.companiesData.industriesLoading,
	technologiesLoading: state.companiesData.technologiesLoading,
	addCompanyLoading: state.companiesData.addCompanyLoading,
});

const mapDispatchToProps = {
	getCompanies: getCompaniesRoutine,
	getTechnologies: getTechnologiesRoutine,
	getIndustries: getIndustriesRoutine,
	addCompany: addCompanyRoutine,
}

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesPage);