import React, { useEffect, useState } from 'react';
import { Loader } from 'semantic-ui-react';
import TagFilter from '../../components/TagFilter';
import Tag from '../../components/Tag';
import SearchField from '../../components/SearchField';
import styles from './styles.module.sass';
import classNames from '../../commons/classnames';
import emptyListImage from '../../assets/empty-list.png';
import { connect } from 'react-redux';
import { createProjectRoutine, getProjectsRoutine } from './routines';
import { getTechnologiesRoutine, getIndustriesRoutine } from '../CompaniesPage/routines';
import ProjectCard from '../../components/ProjectCard';
import { useParams } from 'react-router-dom';
import AddProjectModal from './AddProjectModal';

const ProjectsPage = ({
	own,
	technologiesLoading,
	industriesLoading,
	industries,
	technologies,
	getIndustries,
	getTechnologies,
	projects,
	projectsLoading,
	getProjects,
	createProject,
	projectLoading,
}) => {
	useEffect(() => {
		getProjects({ companyId });
		getIndustries();
		getTechnologies();
	}, []);

	const { companyId } = useParams();
	const [modalOpen, setModalOpen] = useState(false);

	const [searchText, setSearchText] = useState(''); // input text before clicking on search
	const [currentText, setCurrentText] = useState(searchText); // text with which the results are filtered
	const [selectedIndustries, setSelectedIndustries] = useState([]);
	const [selectedTechnologies, setSelectedTechnologies] = useState([]);

	console.log('INDUSTRIES', selectedIndustries);
	console.log('TECHNOLOGIES', selectedTechnologies);

	const searchProjects = () => {
		setCurrentText(searchText);
		getProjects({
			companyId,
			query: searchText,
			industries: selectedIndustries,
			technologies: selectedTechnologies
		});
	}

	const addOrRemoveIfPresent = (id, values) => {
		return values.includes(id) ? [...values.filter(v => v !== id)] : [...values, id];
	}

	return (
		<div className={styles.projects_container}>
			{own && <button
				className={styles.create_project_btn}
				onClick={() => setModalOpen(true)}
			>+</button>}
			<AddProjectModal
				companyId={companyId}
				open={modalOpen}
				setOpen={setModalOpen}
				addProject={createProject}
				projectLoading={projectLoading}
			/>

			<div className={classNames(styles.vertical, styles.filters)}>
				<TagFilter
					className={styles.tag_filter}
					title={'Industries'}
					onReset={() => {
						setSelectedIndustries([]);
						getProjects({ companyId, industries: [], selectedTechnologies, query: currentText });
					}}
					onInput={(e) => {
						getProjects({ companyId, query: e.target.value });
					}}
				>
					<Loader active={industriesLoading} inline />
					{industries.map(ind => (
						<Tag key={ind.id}
							isSelected={selectedIndustries.includes(ind.id)}
							onSelectionChange={() => {
								const ids = addOrRemoveIfPresent(ind.id, selectedIndustries);
								setSelectedIndustries(ids);
								getProjects({ companyId, query: currentText, industries: ids, technologies: selectedTechnologies });
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
						getProjects({ companyId, industries: selectedIndustries, technologies: [], query: currentText });
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
								getProjects({ companyId, query: currentText, industries: selectedIndustries, technologies: ids });
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
					onSearchClick={() => searchProjects()} />
				<Loader active={projectsLoading} inline />
				{!projectsLoading && projects.length === 0 && <>
					<img src={emptyListImage} className={styles.placeholder_image} />
					<p className={styles.placeholder_text}>No results found ...</p>
				</>}
				{projects.map(p => (
					<ProjectCard
						key={p.id}
						id={p.id}
						own={own}
						title={p.title}
						image={p['logo_url']}
						companyName={p.company.name}
						companyId={p.company.id}
						industries={p.industries.map(i => i.name)}
						technologies={p.technologies.map(t => t.name)}
						description={p.description}
					/>
				))}
			</div>
		</div >
	);
}

const mapStateToProps = (state) => ({
	projects: state.projectsData.projects,
	projectsLoading: state.projectsData.loading,
	industries: state.companiesData.industries,
	technologies: state.companiesData.technologies,
	industriesLoading: state.companiesData.industriesLoading,
	technologiesLoading: state.companiesData.technologiesLoading,
	projectLoading: state.projectsData.projectLoading,
});

const mapDispatchToProps = {
	getTechnologies: getTechnologiesRoutine,
	getIndustries: getIndustriesRoutine,
	getProjects: getProjectsRoutine,
	createProject: createProjectRoutine,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPage);