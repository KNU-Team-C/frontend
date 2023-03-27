import React from 'react';
import TagFilter from '../../components/TagFilter';
import Tag from '../../components/Tag';
import SearchField from '../../components/SearchField';
import styles from './styles.module.sass';
import CompanyCard from '../../components/CompanyCard';
import classNames from '../../commons/classnames';


const mockData = [{
	id: 1,
	name: 'Avid Technology',
	image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAllBMVEX///94JeduAObVxffl2fp2IOfVw/dwBOaRVuuIROp3Iud1HOdzFeZrAOVyEub+/f/v5/zayficau338/707v369/6wi/CWYOzTv/Z+MejNt/XGrfS5mfK/ovOrg+/FqvTg0fnr4fuleu6COumNUOqide6fb+3n3PqGQummfO6SV+u2k/GANuivifCYZOyhcu7LtPWLS+qxasFkAAAE7klEQVR4nO2abWObIBSFldbYipg2r03adOlbmrVdt/7/PzfTxHBFUBHM9uE8H1WUI1y4HAgCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMB/zOuZHQ+08Pj6+9rgevyvqt/IZCtYbAMTz9Oi8PQ3OxRmbFTSOL45P72WPbPwotQI2zS0JZsfyk4iUjjNruRbB4Kxxc0JZUlGLOGMVGUsrAWGITsU3nJ6lS+Obx1mSRgm7Pn1tOJ23OwE8Wd5YdhBYZLuyw6YInxZvHW9v8PF48nDcxF9V+VaXpnzioIm0sd90Z9KB+eb4qWDuHiUrU4r8Hb/5ehJXjq3b8Sil78pPye6rCgMwzgcnFDgkCeHOi7lxU/bRkzvDyUv2ijMw7E8tPXKXVZ8NZQXr2wbkRWx1U7hLhx/ToOTMJYjQ0zCQw2nBrK7omBbhbtw/HEShfdSSpLJvzpWhsR6Ej60V5j/0sVZ/wJL3TGbyRvvmVqfGuLbYzkbhWEk3noPx02pQmxyvDGMk9YCaQRbKczDkd33G47KtJC+yFs/dBXSw0gqZqmw93B8VuojSKdZtG3E6Iu80Vph3sc/SLLhmWt1POFzefOm7WAj1m4K83Cck6zYK09RXW23lbta6F/ppnA3O/4aBj2wrLYS7XHrdtO+KA2H3RTm43h2G/gn0UQaHTVaJeB0dHJQmCdyT2vfAle6TyZyQRe8tmlEMsM4KcwfZZ/ld7kyzbSDZUwG79/NjUizBEeFu3Cc+QzHmT5rIRlYMGlsxCRWJmwnhfkP43+8CTTWXmbRxr8gidXFrKNCn+H4Ylw9MOkyTBtyN5qv+VG4mx1HXhK5B3MHPK5mc1b1jUhXzb4U5hXgPkacuplAkAyD1zUidT48KgzTkbvA2tmckw/8qcvdWDWh9KIwydwVXtZmZIJ409XMTv6Ji+qL/bThp7PAhqyamqdn5keFxqT3oZBn7nG4aEiqaff7MkUs10WLj7F07m4Z3zYmUG3MU6Fb8jjPh/Fi7awvCPT5GoWR1GKkb0Q6qXhTmGVeVvx3zS5TwuXjBvOUafuSY17qx7Vp5RRmTeYpTe78KIzYm6el/n0bt7fJPKUJuheFeQD6smtaOvZ0WaTp1rFhSd5VYRr7s9wMA0cFQczTVB2aooXh7V19Go+2aeuds1rzlJl2q7so9LwTpVqkZmrM05JF6qrQ8/ZFxSI1U2OelixSN4Xed4Q/2pmgFR2lVL1skboo5OLR876FxiI1I2unLLeEOWysFPZxMkNnkZoxmKfFqQRXhXHo/3SN1iI1Q81TYnuwmsWNzR5wD0cypsyqCcvm6dG6Ui3STgq5eOnjWE2jOaiSZFXzNGF1rm3bsxhfvRxxm1htzn+jMU8rFmmJynma48xJFGZRxaPzw8z+QF4SywbbbwNULdISalrPj5kROROlX5Z4wGYuLGBrWX616wOi/verJh47nn46nGuLxMbv/gsltBxnVIXBG+NsY3p78UypEVOZ3n2ffUjYZZ9nTN/t45CnpWFltWncx5xu5U5Akn2QAXMpYtZXABbMmCXissOq+y4Sh9L8vXRjslz70VHD8OHcio4Rc7Uv3dfxAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAH/wFCVNIeO+2pZkAAAAASUVORK5CYII=',
	status: 'Verified',
	industries: 'Media',
	technologies: 'C++, Java, Python',
	details: 'Avid Technology is an American technology and multimedia company based in Burlington, Massachusetts, and founded in August 1987 by Bill Warner.'
}, {
	id: 2,
	name: 'Avid Technology',
	image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAllBMVEX///94JeduAObVxffl2fp2IOfVw/dwBOaRVuuIROp3Iud1HOdzFeZrAOVyEub+/f/v5/zayficau338/707v369/6wi/CWYOzTv/Z+MejNt/XGrfS5mfK/ovOrg+/FqvTg0fnr4fuleu6COumNUOqide6fb+3n3PqGQummfO6SV+u2k/GANuivifCYZOyhcu7LtPWLS+qxasFkAAAE7klEQVR4nO2abWObIBSFldbYipg2r03adOlbmrVdt/7/PzfTxHBFUBHM9uE8H1WUI1y4HAgCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMB/zOuZHQ+08Pj6+9rgevyvqt/IZCtYbAMTz9Oi8PQ3OxRmbFTSOL45P72WPbPwotQI2zS0JZsfyk4iUjjNruRbB4Kxxc0JZUlGLOGMVGUsrAWGITsU3nJ6lS+Obx1mSRgm7Pn1tOJ23OwE8Wd5YdhBYZLuyw6YInxZvHW9v8PF48nDcxF9V+VaXpnzioIm0sd90Z9KB+eb4qWDuHiUrU4r8Hb/5ehJXjq3b8Sil78pPye6rCgMwzgcnFDgkCeHOi7lxU/bRkzvDyUv2ijMw7E8tPXKXVZ8NZQXr2wbkRWx1U7hLhx/ToOTMJYjQ0zCQw2nBrK7omBbhbtw/HEShfdSSpLJvzpWhsR6Ej60V5j/0sVZ/wJL3TGbyRvvmVqfGuLbYzkbhWEk3noPx02pQmxyvDGMk9YCaQRbKczDkd33G47KtJC+yFs/dBXSw0gqZqmw93B8VuojSKdZtG3E6Iu80Vph3sc/SLLhmWt1POFzefOm7WAj1m4K83Cck6zYK09RXW23lbta6F/ppnA3O/4aBj2wrLYS7XHrdtO+KA2H3RTm43h2G/gn0UQaHTVaJeB0dHJQmCdyT2vfAle6TyZyQRe8tmlEMsM4KcwfZZ/ld7kyzbSDZUwG79/NjUizBEeFu3Cc+QzHmT5rIRlYMGlsxCRWJmwnhfkP43+8CTTWXmbRxr8gidXFrKNCn+H4Ylw9MOkyTBtyN5qv+VG4mx1HXhK5B3MHPK5mc1b1jUhXzb4U5hXgPkacuplAkAyD1zUidT48KgzTkbvA2tmckw/8qcvdWDWh9KIwydwVXtZmZIJ409XMTv6Ji+qL/bThp7PAhqyamqdn5keFxqT3oZBn7nG4aEiqaff7MkUs10WLj7F07m4Z3zYmUG3MU6Fb8jjPh/Fi7awvCPT5GoWR1GKkb0Q6qXhTmGVeVvx3zS5TwuXjBvOUafuSY17qx7Vp5RRmTeYpTe78KIzYm6el/n0bt7fJPKUJuheFeQD6smtaOvZ0WaTp1rFhSd5VYRr7s9wMA0cFQczTVB2aooXh7V19Go+2aeuds1rzlJl2q7so9LwTpVqkZmrM05JF6qrQ8/ZFxSI1U2OelixSN4Xed4Q/2pmgFR2lVL1skboo5OLR876FxiI1I2unLLeEOWysFPZxMkNnkZoxmKfFqQRXhXHo/3SN1iI1Q81TYnuwmsWNzR5wD0cypsyqCcvm6dG6Ui3STgq5eOnjWE2jOaiSZFXzNGF1rm3bsxhfvRxxm1htzn+jMU8rFmmJynma48xJFGZRxaPzw8z+QF4SywbbbwNULdISalrPj5kROROlX5Z4wGYuLGBrWX616wOi/verJh47nn46nGuLxMbv/gsltBxnVIXBG+NsY3p78UypEVOZ3n2ffUjYZZ9nTN/t45CnpWFltWncx5xu5U5Akn2QAXMpYtZXABbMmCXissOq+y4Sh9L8vXRjslz70VHD8OHcio4Rc7Uv3dfxAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAH/wFCVNIeO+2pZkAAAAASUVORK5CYII=',
	status: 'Verified',
	industries: 'Media',
	technologies: 'C++, Java, Python',
	details: 'Avid Technology is an American technology and multimedia company based in Burlington, Massachusetts, and founded in August 1987 by Bill Warner.'
}];

const CompaniesPage = () => {
	return (
		<div className={styles.companies_container}>
			<div className={classNames(styles.vertical, styles.filters)}>
				<TagFilter
					className={styles.tag_filter}
					title={'Industries'}>
					<Tag isSelected={false}
						text={'Digital marketing'}
						amount={17}
					/>
				</TagFilter>
				<TagFilter
					className={styles.tag_filter}
					title={'Technologies'}>
					<Tag isSelected={false}
						text={'Python'}
						amount={7}
					/>
				</TagFilter>
			</div>
			<div className={classNames(styles.vertical, styles.search_container)}>
				<SearchField className={styles.search_margin} />
				{mockData.map(c => (
					<CompanyCard
						key={c.id}
						id={c.id}
						companyName={c.name}
						image={c.image}
						status={c.status}
						industries={c.industries}
						technologies={c.technologies}
						details={c.details}
					/>
				))}
			</div>
		</div>
	);
}

export default CompaniesPage;