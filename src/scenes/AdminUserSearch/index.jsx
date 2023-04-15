import React, {useEffect, useState} from 'react';
import styles from './styles.module.sass';
import AdminUserCard from "../../components/AdminUserCard";
import TagFilter from "../../components/TagFilter";
import Tag from "../../components/Tag";
import SearchField from "../../components/SearchField";
import classNames from "../../commons/classnames";
import {connect} from "react-redux";
import {getAdminUsersRoutine, setUserBannedRoutine} from "./routines";
import {Loader} from "semantic-ui-react";
import emptyListImage from "../../assets/empty-list.png";

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

                {users.map(u => (
                    <AdminUserCard
                        id={u.id}
                        username={u.first_name + ' ' + u.last_name}
                        status={u.status}
                        image={u.ava_url}
                        details={u.description}
                        key={u.id}
                        onCommunicateClick={() => {
                            window.location.href = "/chats"
                        }}
                        onBanClick={() => {
                            setUserBanned({userId: u.id, banned: true})
                        }}
                        onUnbanClick={() => {
                            setUserBanned({userId: u.id, banned: false})
                        }}
                    />
                ))}
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