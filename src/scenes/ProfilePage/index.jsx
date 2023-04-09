import React, {useEffect, useState} from 'react';
import {Loader} from 'semantic-ui-react';
import styles from './styles.module.sass';
import classNames from '../../commons/classnames';
import {connect} from 'react-redux';
import {editProfileRoutine, getProfileRoutine} from './routines';
import placeholder from "../../assets/image-placeholder.png";

const ProfilePage = ({
                         own,
                         profile,
                         profileLoading,
                         editLoading,
                         getProfile,
                         editProfile,
                     }) => {

    useEffect(() => {
        getProfile({own});
    }, []);

    const [syncedProfile, setSyncedProfile] = useState({});
    const [currentProfile, setCurrentProfile] = useState(profile);

    const areEquals = (profile1, profile2) => {
        return profile1.first_name === profile2.first_name &&
            profile1.last_name === profile2.last_name &&
            profile1.email === profile2.email &&
            profile1.phone_number === profile2.phone_number &&
            profile1.ava_url === profile2.ava_url
    }

    const areProfilesEquals = () => {
        return areEquals(profile, currentProfile)
    }

    if (profile && syncedProfile && !areEquals(profile, syncedProfile)) {
        setCurrentProfile(profile)
        setSyncedProfile(profile)
    }

    const updateProfile = ({
                               new_first_name = currentProfile.first_name,
                               new_last_name = currentProfile.last_name,
                               new_email = currentProfile.email,
                               new_phone_number = currentProfile.phone_number,
                               new_ava_url = currentProfile.ava_url,
                           }) => {
        setCurrentProfile({
            ...currentProfile,
            first_name: new_first_name,
            last_name: new_last_name,
            email: new_email,
            phone_number: new_phone_number,
            ava_url: new_ava_url,
        })
    }
    const makeEditRequest = () => {
        editProfile(currentProfile)
    }

    console.log(currentProfile)

    const notEditableContacts = <div className={classNames(styles.vertical, styles.contacts_container)}>
        <div className={styles.name_text}>{currentProfile.first_name + ' ' + currentProfile.last_name}</div>
        <div className={styles.contacts_text}>{"Email: " + currentProfile.email}</div>
        <div className={styles.contacts_text}>{"Phone: " + currentProfile.phone_number}</div>
    </div>

    const editableContacts = <div className={classNames(styles.vertical, styles.contacts_container)}>
        <div className={styles.horizontal}>
            <input className={styles.name_text} type={"text"}
                   value={currentProfile.first_name || ''}
                   onChange={(e) => {
                       updateProfile({new_first_name: e.target.value})
                   }
                   }/>
            <div className={styles.name_text}>{" "}</div>
            <input className={styles.name_text} type={"text"}
                   value={currentProfile.last_name || ''}
                   onChange={(e) => {
                       updateProfile({new_last_name: e.target.value})
                   }
                   }/>
        </div>
        <div className={classNames(styles.horizontal, styles.child_center_vertical)}>
            <div className={styles.contacts_text}>{"Email: "}</div>
            <input className={classNames(styles.contacts_text, styles.text_input)} type={"text"}
                   value={currentProfile.email || ''}
                   onChange={(e) => {
                       updateProfile({new_email: e.target.value})
                   }
                   }/>
        </div>
        <div className={classNames(styles.horizontal, styles.child_center_vertical)}>
            <div className={styles.contacts_text}>{"Phone: "}</div>
            <input className={classNames(styles.contacts_text, styles.text_input)} type={"text"}
                   value={currentProfile.phone_number || ''}
                   onChange={(e) => {
                       updateProfile({new_phone_number: e.target.value})
                   }
                   }/>
        </div>
    </div>

    return (
        <div className={styles.main_container}>
            {profile &&
                <div className={styles.horizontal}>
                    <img className={styles.avatar_image} src={currentProfile.ava_url || placeholder}/>
                    {own ? editableContacts : notEditableContacts}
                </div>
            }
            {!areProfilesEquals() && !editLoading &&
                <button
                    className={styles.button_save}
                    onClick={() => {
                        makeEditRequest()
                    }}
                    key={"Save changes"}
                >{"Save changes"}</button>
            }
            <Loader active={profileLoading || editLoading} inline/>
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