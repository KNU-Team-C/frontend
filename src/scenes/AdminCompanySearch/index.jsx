import React from 'react';
import styles from './styles.module.sass';
import TagFilter from "../../components/TagFilter";
import Tag from "../../components/Tag";
import SearchField from "../../components/SearchField";
import classNames from "../../commons/classnames";
import AdminCompanyCard from "../../components/AdminCompanyCard";

const AdminCompanyPage = () => {
    return (
        <div className={styles.home_container}>
            <div className={classNames(styles.vertical, styles.filters)}>
                <TagFilter
                    className={styles.tag_filter}
                    title={'Status'}>
                    <Tag isSelected={false}
                        text={'Banned'}
                        amount={1700}
                    />
                    <Tag isSelected={false}
                        text={'Reported'}
                        amount={1700}
                    />
                </TagFilter>
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
                <AdminCompanyCard
                    typeOfRequest={'Test type of request'}
                    companyName={'SpaceX'}
                    status={'test status'}
                    industries={'test industries'}
                    technologies={'test technologies'}
                    image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmIOwOnuCEsJWQ-tRQ9G8yJsmkulH0-Ck8Jae58R5w&s'}
                    details={'Our company is a leader of space industry. We welcome you to take a look at our impressive projects.'}
                    onCommunicateClick={() => {
                    }}
                    onVerifyClick={() => {
                    }}
                    onDeclineClick={() => {
                    }} />
                <AdminCompanyCard
                    typeOfRequest={'Test type of request'}
                    companyName={'Tesla'}
                    status={'test status'}
                    industries={'test industries'}
                    technologies={'test technologies'}
                    image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmIOwOnuCEsJWQ-tRQ9G8yJsmkulH0-Ck8Jae58R5w&s'}
                    details={'test details'}
                    onCommunicateClick={() => {
                    }}
                    onVerifyClick={() => {
                    }}
                    onDeclineClick={() => {
                    }} />
            </div>
        </div>
    );
}


export default AdminCompanyPage;