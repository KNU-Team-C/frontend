import React from 'react';
import TagFilter from '../../components/TagFilter';
import Tag from '../../components/Tag';
import SearchField from '../../components/SearchField';
import styles from './styles.module.sass';
import CompanyCard from '../../components/CompanyCard';
import classNames from '../../commons/classnames';


const CompaniesPage = () => {
	return (
		<div className={styles.companies_container}>
			<div className={classNames(styles.vertical, styles.filters)}>
				<TagFilter
					title={'Type'}>
					<Tag isSelected={false}
						text={'Banned'}
						amount={1700}
					/>
					<Tag isSelected={false}
						text={'Reported'}
						amount={1710}
					/>
				</TagFilter>
			</div>
			<div className={classNames(styles.vertical, styles.search_container)}>
				<SearchField className={styles.search_margin} />
				<CompanyCard
					username={'Test username'}
					status={'test status'}
					image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmIOwOnuCEsJWQ-tRQ9G8yJsmkulH0-Ck8Jae58R5w&s'}
					company={'test company'}
					details={'test details'} />
				<CompanyCard username={'Test username'}
					status={'test status'}
					image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmIOwOnuCEsJWQ-tRQ9G8yJsmkulH0-Ck8Jae58R5w&s'}
					company={'test company'}
					details={'test details'} />
			</div>
		</div>
	);
}

export default CompaniesPage;