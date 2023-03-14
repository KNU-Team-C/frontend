import React from 'react';
import styles from './styles.module.sass';
import AdminUserCard from "../../components/AdminUserCard";
import TagFilter from "../../components/TagFilter";
import Tag from "../../components/Tag";
import SearchField from "../../components/SearchField";
import classNames from "../../commons/classnames";

const AdminUserPage = () => {
    return (
        <div className={styles.home_container}>
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
                <SearchField className={styles.search_margin}/>
                <AdminUserCard
                    username={'Test username'}
                    status={'test status'}
                    image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmIOwOnuCEsJWQ-tRQ9G8yJsmkulH0-Ck8Jae58R5w&s'}
                    company={'test company'}
                    details={'test details'}/>
                <AdminUserCard username={'Test username'}
                               status={'test status'}
                               image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmIOwOnuCEsJWQ-tRQ9G8yJsmkulH0-Ck8Jae58R5w&s'}
                               company={'test company'}
                               details={'test details'}/>
            </div>
        </div>
    );
}


export default AdminUserPage;