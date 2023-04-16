import React, {useEffect, useState} from 'react';
import styles from './styles.module.sass';
import TagFilter from "../../components/TagFilter";
import Tag from "../../components/Tag";
import SearchField from "../../components/SearchField";
import classNames from "../../commons/classnames";
import {connect} from "react-redux";
import {getAdminUsersRoutine, setUserBannedRoutine} from "./routines";
import {Loader} from "semantic-ui-react";
import emptyListImage from "../../assets/empty-list.png";
import GenericCard from "../../components/GenericCard";

const AdminUserPage = ({
                           usersLoading,
                           users,
                           getUsers,
                           setUserBanned,
                       }) => {

    const [searchText, setSearchText] = useState(''); // input text before clicking on search
    const [currentText, setCurrentText] = useState(searchText); // text with which the results are filtered
    const [bannedSelected, setBannedSelected] = useState(false);
    const [reportedSelected, setReportedSelected] = useState(false);
    const searchUsers = () => {
        setCurrentText(searchText);
        getUsers({
            query: searchText,
            banned: bannedSelected,
            reported: reportedSelected,
        });
    }

    useEffect(() => {
        searchUsers();
    }, []);

    return (
        <div className={styles.home_container}>
            <div className={classNames(styles.vertical, styles.filters)}>
                <TagFilter
                    className={styles.tag_filter}
                    title={'Status'}
                    onReset={() => {
                        setBannedSelected(false);
                        setReportedSelected(false);
                        getUsers({
                            query: currentText,
                            banned: false,
                            reported: false,
                        });
                    }}
                >
                    <Tag
                        text={'Banned'}
                        amount={''}
                        isSelected={bannedSelected}
                        onSelectionChange={() => {
                            setBannedSelected(!bannedSelected);
                            getUsers({
                                query: currentText,
                                banned: !bannedSelected,
                                reported: reportedSelected,
                            });
                        }}
                    />
                    <Tag
                        text={'Reported'}
                        amount={''}
                        isSelected={reportedSelected}
                        onSelectionChange={() => {
                            setReportedSelected(!reportedSelected);
                            getUsers({
                                query: currentText,
                                banned: bannedSelected,
                                reported: !reportedSelected,
                            });
                        }}
                    />
                </TagFilter>
            </div>
            <div className={classNames(styles.vertical, styles.search_container)}>
                <SearchField
                    className={styles.search_margin}
                    onInput={(e) => setSearchText(e.target.value)}
                    onSearchClick={() => searchUsers()}/>
                <Loader active={usersLoading} inline/>
                {!usersLoading && (users === undefined || users.length === 0) && <>
                    <img src={emptyListImage} className={styles.placeholder_image}/>
                    <p className={styles.placeholder_text}>No results found ...</p>
                </>}

                {users.map(function (u) {

                    const infoItems = [{
                        title: 'Status',
                        content: u.is_blocked ? "Banned" : "Not banned"
                    }];

                    let cardControls = [{
                        text: 'Communicate',
                        className: styles.button_communicate,
                        onClick: () => {
                            window.location.href = "/chats"
                        }
                    }];
                    if (u.is_blocked) {
                        cardControls.push({
                            text: 'Unban',
                            className: styles.button_unban,
                            onClick: () => {
                                setUserBanned({userId: u.id, banned: false})
                            }
                        })
                    } else {
                        cardControls.push({
                            text: 'Ban',
                            className: styles.button_ban,
                            onClick: () => {
                                setUserBanned({userId: u.id, banned: true})
                            }
                        })
                    }

                    return (
                        <GenericCard
                            itemHeader={u.first_name + ' ' + u.last_name}
                            image={u.ava_url}
                            infoItems={infoItems}
                            details={u.description}
                            controls={cardControls}
                            key={u.id}
                        />
                    );
                })}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    users: state.adminUsersData.users,
    usersLoading: state.adminUsersData.usersLoading,
});

const mapDispatchToProps = {
    getUsers: getAdminUsersRoutine,
    setUserBanned: setUserBannedRoutine,
}


export default connect(mapStateToProps, mapDispatchToProps)(AdminUserPage);