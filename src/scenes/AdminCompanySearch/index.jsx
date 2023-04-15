import React, { useEffect, useState } from 'react';
import styles from './styles.module.sass';
import TagFilter from "../../components/TagFilter";
import Tag from "../../components/Tag";
import SearchField from "../../components/SearchField";
import classNames from "../../commons/classnames";
import AdminCompanyCard from "../../components/AdminCompanyCard";
import { connect } from "react-redux";
import { Loader } from "semantic-ui-react";
import emptyListImage from "../../assets/empty-list.png";
import {
    getAdminCompaniesRoutine,
    getAdminIndustriesRoutine,
    getAdminTechnologiesRoutine,
    setAdminCompanyVerifiedRoutine,
    setAdminCompanyVerifyDismissRoutine
} from "./routines";

const AdminCompanyPage = ({
    companiesLoading,
    technologiesLoading,
    industriesLoading,
    companies,
    industries,
    technologies,
    getCompanies,
    getIndustries,
    getTechnologies,
    setAdminCompanyVerified,
    setAdminCompanyVerifyDismiss,
}) => {

    const [searchText, setSearchText] = useState(''); // input text before clicking on search
    const [currentText, setCurrentText] = useState(searchText); // text with which the results are filtered
    const [bannedSelected, setBannedSelected] = useState(false);
    const [reportedSelected, setReportedSelected] = useState(false);
    const [selectedIndustries, setSelectedIndustries] = useState([]);
    const [selectedTechnologies, setSelectedTechnologies] = useState([]);

    const searchCompanies = () => {
        setCurrentText(searchText);
        getCompanies({
            query: searchText,
            banned: bannedSelected,
            reported: reportedSelected,
            industries: selectedIndustries,
            technologies: selectedTechnologies
        });
    }

    useEffect(() => {
        searchCompanies();
        getIndustries();
        getTechnologies();
    }, []);

    const addOrRemoveIfPresent = (id, values) => {
        return values.includes(id) ? [...values.filter(v => v !== id)] : [...values, id];
    }

    return (
        <div className={styles.home_container}>
            <div className={classNames(styles.vertical, styles.filters)}>
                <TagFilter
                    className={styles.tag_filter}
                    title={'Status'}
                    onReset={() => {
                        setBannedSelected(false);
                        setReportedSelected(false);
                        getCompanies({
                            query: currentText,
                            banned: false,
                            reported: false,
                            industries: selectedIndustries,
                            technologies: selectedTechnologies
                        });
                    }}
                >
                    <Tag
                        text={'Banned'}
                        amount={''}
                        isSelected={bannedSelected}
                        onSelectionChange={() => {
                            setBannedSelected(!bannedSelected);
                            getCompanies({
                                query: currentText,
                                banned: !bannedSelected,
                                reported: reportedSelected,
                                industries: selectedIndustries,
                                technologies: selectedTechnologies
                            });
                        }}
                    />
                    <Tag
                        text={'Reported'}
                        amount={''}
                        isSelected={reportedSelected}
                        onSelectionChange={() => {
                            setReportedSelected(!reportedSelected);
                            getCompanies({
                                query: currentText,
                                banned: bannedSelected,
                                reported: !reportedSelected,
                                industries: selectedIndustries,
                                technologies: selectedTechnologies
                            });
                        }}
                    />
                </TagFilter>
                <TagFilter
                    className={styles.tag_filter}
                    title={'Industries'}
                    onReset={() => {
                        setSelectedIndustries([]);
                        getCompanies({
                            industries: [],
                            banned: bannedSelected,
                            reported: reportedSelected,
                            selectedTechnologies,
                            query: currentText
                        });
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
                                getCompanies({
                                    query: currentText,
                                    banned: bannedSelected,
                                    reported: reportedSelected,
                                    industries: ids,
                                    technologies: selectedTechnologies
                                });
                            }}
                            text={ind.name}
                            amount={ind.amount}
                        />
                    ))}
                </TagFilter>
                <TagFilter
                    className={styles.tag_filter}
                    title={'Technologies'}
                    onReset={() => {
                        setSelectedTechnologies([]);
                        getCompanies({
                            industries: selectedIndustries,
                            banned: bannedSelected,
                            reported: reportedSelected,
                            technologies: [],
                            query: currentText
                        });
                    }}
                    onInput={(e) => {
                        getTechnologies({ query: e.target.value });
                    }}
                >
                    <Loader active={technologiesLoading} inline />
                    {technologies.map(tech => (
                        <Tag key={tech.id}
                            isSelected={selectedTechnologies.includes(tech.id)}
                            onSelectionChange={() => {
                                const ids = addOrRemoveIfPresent(tech.id, selectedTechnologies);
                                setSelectedTechnologies(ids);
                                getCompanies({
                                    query: currentText,
                                    banned: bannedSelected,
                                    reported: reportedSelected,
                                    industries: selectedIndustries,
                                    technologies: ids
                                });
                            }}
                            text={tech.name}
                            amount={tech.amount}
                        />
                    ))}
                </TagFilter>
            </div>
            <div className={classNames(styles.vertical, styles.search_container)}>
                <SearchField
                    className={styles.search_margin}
                    onInput={(e) => setSearchText(e.target.value)}
                    onSearchClick={() => searchCompanies()}
                />
                <Loader active={companiesLoading} inline />
                {!companiesLoading && (companies === undefined || companies.length === 0) && <>
                    <img src={emptyListImage} className={styles.placeholder_image} />
                    <p className={styles.placeholder_text}>No results found ...</p>
                </>}

                {companies.map(c => (
                    <AdminCompanyCard
                        key={c.id}
                        companyName={c.name}
                        image={c.ava_url}
                        status={c.isVerified ? 'Verified' : 'Not verified'}
                        industries={c.industries}
                        technologies={c.technologies}
                        details={c.description}
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
    companies: state.adminCompaniesData.companies,
    industries: state.adminCompaniesData.industries,
    technologies: state.adminCompaniesData.technologies,
    companiesLoading: state.adminCompaniesData.companiesLoading,
    industriesLoading: state.adminCompaniesData.industriesLoading,
    technologiesLoading: state.adminCompaniesData.technologiesLoading,
});

const mapDispatchToProps = {
    getCompanies: getAdminCompaniesRoutine,
    getTechnologies: getAdminTechnologiesRoutine,
    getIndustries: getAdminIndustriesRoutine,
    setAdminCompanyVerified: setAdminCompanyVerifiedRoutine,
    setAdminCompanyVerifyDismiss: setAdminCompanyVerifyDismissRoutine,
}


export default connect(mapStateToProps, mapDispatchToProps)(AdminCompanyPage);