import React from 'react';
import {Link} from 'react-router-dom/cjs/react-router-dom';
import styles from './styles.module.sass';
import AdminUserCard from "../../components/AdminUserCard";
import AdminRequestCompanyCard from "../../components/AdminRequestCompanyCard";
import AdminRequestUserCard from "../../components/AdminRequestUserCard";
import AdminCompanyCard from "../../components/AdminCompanyCard";
import TagFilter from "../../components/TagFilter";
import Tag from "../../components/Tag";
import SearchField from "../../components/SearchField";

const AdminHomePage = () => {
    return (
        <div className={styles.home_container}>
            <Link to="/search">
                <div className={styles.main_options}>
                    <div className={`${styles.glow_on_hover} ${styles.search_btn}`}>Search Companies</div>
                </div>
            </Link>
            <SearchField/>
            <AdminUserCard username={'Test username'}
                           status={'test status'}
                           image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmIOwOnuCEsJWQ-tRQ9G8yJsmkulH0-Ck8Jae58R5w&s'}
                           company={'test company'}
                           details={'test details'}/>
            <AdminCompanyCard typeOfRequest={'Test type of request'}
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
                              }}
            />
            <AdminRequestUserCard typeOfRequest={'Test type of request'}
                                  username={'Test username'}
                                  status={'test status'}
                                  image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmIOwOnuCEsJWQ-tRQ9G8yJsmkulH0-Ck8Jae58R5w&s'}
                                  company={'test ompany'}
                                  details={'test details'}
                                  onCommunicateClick={() => {
                                  }}
                                  onVerifyClick={() => {
                                  }}
                                  onDeclineClick={() => {
                                  }}
            />
            <AdminRequestCompanyCard typeOfRequest={'Test type of request'}
                                     companyName={'test companyName'}
                                     image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmIOwOnuCEsJWQ-tRQ9G8yJsmkulH0-Ck8Jae58R5w&s'}
                                     status={'test status'}
                                     industries={'test industries'}
                                     technologies={'test technologies'}
                                     details={'test details'}
                                     onCommunicateClick={() => {
                                     }}
                                     onVerifyClick={() => {
                                     }}
                                     onDeclineClick={() => {
                                     }}
            />
            <TagFilter
                title={'asdad'}>
                <Tag isSelected={true}
                     text={'asdawrwer'}
                     amount={12341}
                />
            </TagFilter>
        </div>
    );
}


export default AdminHomePage;