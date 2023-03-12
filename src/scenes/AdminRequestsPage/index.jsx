import React from 'react';
import styles from './styles.module.sass';
import AdminRequestCompanyCard from "../../components/AdminRequestCompanyCard";
import AdminRequestUserCard from "../../components/AdminRequestUserCard";
import TagFilter from "../../components/TagFilter";
import Tag from "../../components/Tag";
import SearchField from "../../components/SearchField";
import classNames from "../../commons/classnames";
import Checkbox from "../../components/Checkbox";

const AdminRequestsPage = () => {
    return (
        <div className={styles.home_container}>
            <div className={classNames(styles.vertical, styles.filters)}>
                <TagFilter
                    className={styles.tag_filter}
                    title={'Type'}>
                    <Tag isSelected={false}
                         text={'Verification'}
                         amount={1700}
                    />
                    <Tag isSelected={false}
                         text={'Reports'}
                         amount={1710}
                    />
                </TagFilter>
            </div>
            <div className={classNames(styles.vertical, styles.search_container)}>
                <div className={classNames(styles.horizontal, styles.search_field_container)}>
                    <Checkbox label={"Users"} className={styles.checkbox}/>
                    <Checkbox label={"Companies"} className={styles.checkbox}/>
                    <SearchField className={styles.search_margin}/>
                </div>
                <AdminRequestCompanyCard
                    typeOfRequest={'Test type of request'}
                    companyName={'test companyName'}
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
                    }}/>
                <AdminRequestUserCard
                    username={'Test username'}
                    status={'test status'}
                    image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmIOwOnuCEsJWQ-tRQ9G8yJsmkulH0-Ck8Jae58R5w&s'}
                    company={'test company'}
                    details={'test details'}/>
            </div>
        </div>
    );
}


export default AdminRequestsPage;