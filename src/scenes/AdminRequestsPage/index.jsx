import React, {useEffect, useState} from 'react';
import styles from './styles.module.sass';
import AdminRequestCompanyCard from "../../components/AdminRequestCompanyCard";
import TagFilter from "../../components/TagFilter";
import Tag from "../../components/Tag";
import SearchField from "../../components/SearchField";
import classNames from "../../commons/classnames";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {connect} from "react-redux";
import {Loader} from "semantic-ui-react";
import emptyListImage from "../../assets/empty-list.png";
import {
    getAdminRequestsCompaniesRoutine,
    getAdminRequestsUsersRoutine,
    setAdminCompanyVerifyDismissRoutine,
    setAdminCompanyVerifiedRoutine,
    setUserBannedRoutine
} from "./routines";
import GenericCard from "../../components/GenericCard";


function getDescriptionForCompany(company) {
    if (!company.isVerified) {
        return company.description
    } else {
        let description = company.description || "";
        description += "\nReports:\n"
        for (const report of company.reports || []) {
            description += report.message + "\n"
        }
        return description
    }
}

function getDescriptionForUser(user) {
    let description = user.description || "";
    description += "\nReports:\n"
    for (const report of user.reports || []) {
        description += report.message + "\n"
    }
    return description
}

const AdminRequestsPage = ({
                               companies,
                               companiesLoading,
                               getCompanies,
                               usersLoading,
                               users,
                               getUsers,
                               setUserBanned,
                               setAdminCompanyVerified,
                               setAdminCompanyVerifyDismiss,
                           }) => {

    const [searchText, setSearchText] = useState(''); // input text before clicking on search
    const [currentText, setCurrentText] = useState(searchText); // text with which the results are filtered
    const [verificationSelected, setVerificationSelected] = useState(false);
    const [reportsSelected, setReportsSelected] = useState(false);
    const [tabSelected, setTabSelected] = useState(0);
    const performSearch = (tab = tabSelected) => {
        setCurrentText(searchText);
        performGet({
            query: searchText,
            verification: verificationSelected,
            reports: reportsSelected,
        }, tab);
    }

    const performGet = (args, tab = tabSelected) => {
        switch (tab) {
            case 0:
                getUsers(args)
                break
            case 1:
                getCompanies(args)
                break
        }
    }

    useEffect(() => {
        performSearch();
    }, []);

    return (
        <div className={styles.home_container}>
            <div className={classNames(styles.vertical, styles.filters)}>
                <TagFilter
                    className={styles.tag_filter}
                    title={'Type'}
                    onReset={() => {
                        setVerificationSelected(false);
                        setReportsSelected(false);
                        performGet({
                            query: currentText,
                            verification: false,
                            reports: false,
                        });
                    }}
                >
                    <Tag
                        text={'Verification'}
                        amount={''}
                        isSelected={verificationSelected}
                        onSelectionChange={() => {
                            setVerificationSelected(!verificationSelected);
                            performGet({
                                query: currentText,
                                verification: !verificationSelected,
                                reports: reportsSelected,
                            });
                        }}
                    />
                    <Tag
                        text={'Reports'}
                        amount={''}
                        isSelected={reportsSelected}
                        onSelectionChange={() => {
                            setReportsSelected(!reportsSelected);
                            performGet({
                                query: currentText,
                                verification: verificationSelected,
                                reports: !reportsSelected,
                            });
                        }}
                    />
                </TagFilter>
            </div>
            <div className={classNames(styles.vertical, styles.search_container)}>
                <div className={classNames(styles.horizontal, styles.search_field_container)}>
                    <Tabs value={tabSelected}
                          onChange={(event, newValue) => {
                              setTabSelected(newValue);
                              performSearch(newValue)
                          }}
                          className={styles.tabs}
                          variant="fullWidth"
                          scrollButtons={false}>
                        <Tab label="Users" wrapped/>
                        <Tab label="Companies" wrapped/>
                    </Tabs>
                    <SearchField
                        className={styles.search_margin}
                        onInput={(e) => setSearchText(e.target.value)}
                        onSearchClick={() => performSearch()}/>
                </div>
                <Loader active={usersLoading || companiesLoading} inline/>
                {!usersLoading && !companiesLoading && (users === undefined || users.length === 0) && (companies === undefined || companies.length === 0) && <>
                    <img src={emptyListImage} className={styles.placeholder_image}/>
                    <p className={styles.placeholder_text}>No results found ...</p>
                </>}

                {users.map(function (u) {
                    let cardControls = [{
                        text: 'Communicate',
                        className: styles.button_communicate,
                        onClick: () => {
                            window.location.href = "/chats"
                        }
                    }, {
                        text: 'Ban',
                        className: styles.button_ban,
                        onClick: () => {
                            setUserBanned({userId: u.id, banned: true})
                        }
                    }];

                    return (
                        <GenericCard
                            itemHeader={u.first_name + ' ' + u.last_name}
                            infoItems={[]}
                            image={u.ava_url}
                            details={getDescriptionForUser(u)}
                            controls={cardControls}
                            key={u.id}
                        />
                    );
                })}

                {companies.map(c => (
                    <AdminRequestCompanyCard
                        key={c.id}
                        id={c.id}
                        companyName={c.name}
                        image={c.ava_url}
                        typeOfRequest={c.isVerified ? 'Reported' : 'Verification request'}
                        status={c.isVerified ? 'Verified' : 'Not verified'}
                        industries={c.industries.map(i => i.name)}
                        technologies={c.technologies.map(i => i.name)}
                        details={getDescriptionForCompany(c)}
                        onCommunicateClick={() => {
                            window.location.href = "/chats"
                        }}
                        onVerifyClick={() => {
                            setAdminCompanyVerified({companyId: c.id})
                        }}
                        onDeclineClick={() => {
                            setAdminCompanyVerifyDismiss({companyId: c.id})
                        }}
                    />
                ))}
            </div>
        </div>
    );
}


const mapStateToProps = (state) => ({
    companies: state.adminRequestsData.companies,
    companiesLoading: state.adminRequestsData.companiesLoading,
    users: state.adminRequestsData.users,
    usersLoading: state.adminRequestsData.usersLoading,
});

const mapDispatchToProps = {
    getUsers: getAdminRequestsUsersRoutine,
    getCompanies: getAdminRequestsCompaniesRoutine,
    setAdminCompanyVerified: setAdminCompanyVerifiedRoutine,
    setAdminCompanyVerifyDismiss: setAdminCompanyVerifyDismissRoutine,
    setUserBanned: setUserBannedRoutine,
}


export default connect(mapStateToProps, mapDispatchToProps)(AdminRequestsPage);