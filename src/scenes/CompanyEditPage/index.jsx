import React, { useEffect, useState } from 'react';
import classNames from "../../commons/classnames";
import styles from './styles.module.sass';
import CompanyLeftInfo from '../../components/CompanyLeftInfo';
import CompanyTopInfo from '../../components/CompanyTopInfo';
import { connect } from 'react-redux';
import { getCompanyRoutine, updateCompanyRoutine } from './routines';

const CompanyEditPage = ({
    company_id,
	name,
    location,
    email,
    phoneNumber,
    industries,
    technologies,
    isVerified,
    isBlocked,
    description,
    logoUrl,
    getCompany,
    updateCompany,
    //id,
	//companyLoading,
}) => {
    const [newEmail, setNewEmail] = useState(email);
    const [newPhone, setPhone] = useState(phoneNumber);
    const [newDesc, setDesc] = useState(description);
    const [newName, setName] = useState(name);
    const [newLoc, setLoc] = useState(location);


    const editComp = (nEmail)=>{
        setNewEmail(nEmail);
        setPhone(newPhone);
        setDesc(newDesc);
        setName(newName);
        setLoc(newLoc);
        updateCompany({
            company_id:company_id,
            email:newEmail,
            phone_number:newPhone,
            description: newDesc,
            name:newName,
            location:newLoc,
        });
        
    }

    company_id=1;
    useEffect(() => {
		getCompany({ company_id});
		
	}, []);
    return (
        <div className={styles.main_row}>
           
                <CompanyLeftInfo 
                email={email}
                phone={phoneNumber}
                description={description}
                edit={true}
                logoUrl={logoUrl}
                updateEmail={setNewEmail}
                updatePhone={setPhone}
                updateDesc ={setDesc}
                id={company_id}
                ></CompanyLeftInfo>
                <CompanyTopInfo
                companyName={name}
                companyLocation={location}
                industries={industries}
                technologies={technologies}
                verified={isVerified}
                banned = {isBlocked}
                edit={true}
                updateName={setName}
                updateLoc={setLoc}
                ></CompanyTopInfo>
                <div className={classNames(styles.info_row, styles.btn_container)}>
                    <button className={classNames(styles.btn)} onClick={editComp}>Save changes</button>
                    <button className={classNames(styles.btn)}>Verify</button>
                    <button className={classNames(styles.btn)}>Contact admin</button>
                    <button className={classNames(styles.btn)}>Edit projects</button>
                    <button className={classNames(styles.btn)}>Edit sets</button>               
                </div>
        </div>
        
    ); 

}

const mapStateToProps = (state) => ({
	
	name: state.companyEditData.name,
    location: state.companyEditData.location,
    email: state.companyEditData.email,
    phoneNumber: state.companyEditData.phoneNumber,
    industries: state.companyEditData.industries,
    technologies: state.companyEditData.technologies,
    isVerified: state.companyEditData.isVerified,
    isBlocked: state.companyEditData.isBlocked,
    description: state.companyEditData.description,
    logoUrl: state.companyEditData.logoUrl,
    id: state.companyEditData.id,
	companyLoading: state.companyEditData.companyLoading,
});

const mapDispatchToProps = {
	getCompany: getCompanyRoutine,
	updateCompany: updateCompanyRoutine,
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyEditPage);