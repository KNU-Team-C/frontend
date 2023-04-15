import React, { useEffect, useState } from 'react';
import ScreenLoader from '../../components/ScreenLoader';
import styles from './styles.module.sass';
import classNames from '../../commons/classnames';
import { connect } from 'react-redux';
import { editProfileRoutine, getProfileRoutine } from './routines';
import placeholder from "../../assets/image-placeholder.png";
import { emailRegex, nameRegex, validate } from '../../helpers/validation.helper';
import { toastr } from 'react-redux-toastr';

const ProfilePage = ({
    own,
    id,
    profile,
    profileLoading,
    editLoading,
    getProfile,
    editProfile,
}) => {

    useEffect(() => {
        getProfile({ own, id });
    }, []);

    const [isEditing, setEditing] = useState(false)

    const [syncedProfile, setSyncedProfile] = useState({});
    const [currentProfile, setCurrentProfile] = useState(profile);
    const [editedName, setEditedName] = useState("");

    const editStyles = () => {
        return isEditing ? styles.editable : styles.disabled
    }

    const areEquals = (profile1, profile2) => {
        return profile1.first_name === profile2.first_name &&
            profile1.last_name === profile2.last_name &&
            profile1.email === profile2.email &&
            profile1.phone_number === profile2.phone_number &&
            profile1.ava_url === profile2.ava_url
    }

    if (profile && syncedProfile && !areEquals(profile, syncedProfile)) {
        setCurrentProfile(profile)
        setSyncedProfile(profile)
        setEditedName(profile.first_name + " " + profile.last_name)
    }

    const cancel = () => {
        setCurrentProfile(syncedProfile);
        setEditing(false);
        setEditedName(syncedProfile.first_name + " " + syncedProfile.last_name);
    }

    const updateProfile = ({
        new_edited_name = editedName,
        new_email = currentProfile.email,
        new_phone_number = currentProfile.phone_number,
        new_ava_url = currentProfile.ava_url,
    }) => {
        const index = new_edited_name.search(" ")
        setCurrentProfile({
            ...currentProfile,
            first_name: new_edited_name.substring(0, index),
            last_name: new_edited_name.substring(index + 1),
            email: new_email,
            phone_number: new_phone_number,
            ava_url: new_ava_url,
        })
        setEditedName(new_edited_name)
    }

    const validateData = () => {
        if (currentProfile.first_name === '' || currentProfile.last_name === '') {
            toastr.error('Invalid name', 'Please provide first and last name');
            return false;
        }
        if (!validate(currentProfile.first_name, nameRegex, false)
            || !validate(currentProfile.last_name, nameRegex, false)) {
            toastr.error('Invalid name', 'Name should contain alphabetic characters only');
            return false;
        }
        if (!validate(currentProfile.email, emailRegex, true)) {
            toastr.error('Invalid email', 'Please check your email format');
            return false;
        }
        return true;
    }

    const makeEditRequest = () => {
        console.log(currentProfile)
        if (!validateData()) {
            return;
        }
        editProfile(currentProfile);
        setEditing(false);
    }

    const notEditableContacts = <div className={classNames(styles.vertical, styles.contacts_container)}>
        <div className={styles.name_text}>{currentProfile.first_name + ' ' + currentProfile.last_name}</div>
        <div className={styles.contacts_header}>{"Email: " + currentProfile.email}</div>
        <div className={styles.contacts_header}>{"Phone: " + currentProfile.phone_number}</div>
    </div>

    const editableContacts = <div className={classNames(styles.vertical, styles.contacts_container)}>
        <div className={styles.horizontal}>
            <input className={classNames(styles.name_text, editStyles())} type={"text"}
                disabled={!isEditing}
                value={editedName}
                onChange={(e) => {
                    updateProfile({ new_edited_name: e.target.value })
                }} />
        </div>
        <div className={classNames(styles.horizontal, styles.child_center_vertical)}>
            <div className={styles.contacts_header}>{"Email: "}</div>
            <input className={classNames(styles.contacts_text, styles.text_input, editStyles())} type={"text"}
                value={currentProfile.email || ''}
                disabled={!isEditing}
                onChange={(e) => {
                    updateProfile({ new_email: e.target.value })
                }} />
        </div>
        <div className={classNames(styles.horizontal, styles.child_center_vertical)}>
            <div className={styles.contacts_header}>{"Phone: "}</div>
            <input className={classNames(styles.contacts_text, styles.text_input, editStyles())} type={"text"}
                disabled={!isEditing}
                value={currentProfile.phone_number || ''}
                onChange={(e) => {
                    updateProfile({ new_phone_number: e.target.value })
                }} />
        </div>
    </div>

    return (
        <div className={styles.main_container}>
            {(profileLoading || editLoading) ? <ScreenLoader /> : (
                <div className={styles.profile_card}>
                    <div className={styles.horizontal}>
                        <img className={styles.avatar_image} src={currentProfile.ava_url || placeholder} />
                        {own ? editableContacts : notEditableContacts}
                    </div>
                    <div className={styles.controls}>
                        {own && <div className={styles.custom_file_input}>
                            <div>
                                <input type="file" />
                                <span>Upload photo</span>
                            </div>
                        </div>}
                        {own && !isEditing &&
                            <button className={styles.btn} onClick={() => setEditing(true)}>Edit</button>}
                        {own && isEditing &&
                            <button className={styles.btn} onClick={() => makeEditRequest()}>Save</button>}
                        {own && isEditing &&
                            <button className={styles.btn_reverted} onClick={() => cancel()}>Cancel</button>}
                    </div>
                </div>
            )}
        </div>
    );
}

const mapStateToProps = (state) => ({
    profile: state.profileData.profile,
    profileLoading: state.profileData.profileLoading,
    editLoading: state.profileData.editLoading,
});

const mapDispatchToProps = {
    getProfile: getProfileRoutine,
    editProfile: editProfileRoutine,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);