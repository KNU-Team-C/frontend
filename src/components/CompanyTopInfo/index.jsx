import React,{ useState, useEffect } from 'react';
import classNames from "../../commons/classnames";
import styles from './styles.module.sass';

import pencilIco from '../../assets/pencil_ico.png';
const CompanyTopInfo = (props) => {
    const {
        companyName,
        companyLocation,
        industries,
        technologies,
        edit,
        verified,
        banned,
        updateName,
        updateLoc,
    } = props;
    const [newName, setName] = useState(companyName);
    const [newLoc, setLoc] = useState(companyLocation);

    useEffect(()=>{
        setLoc(companyLocation);
        setName(companyName);
    },[companyLocation, companyName]);

    const industriesNames = industries.map(ind=>ind.name).join(", ");
    const technologiesNames = technologies.map(tech=>tech.name).join(", ");
    const editTextarea = (value) =>{
        //console.log("test 1");
        var element = document.getElementById(value);
        if (element) {
            element.disabled = !element.disabled;
            if (!element.disabled){
                element.focus();
            }
          }
    }
    

    const lostFocus = (event)=>{
        var element = event.target;
        //console.log(event.type);
        if (element) {
            if(event.type=='blur' || (event.type=='keydown'&&event.key === 'Enter')){
                element.disabled = true;   
                updateName(newName);
                updateLoc(newLoc);
            }         
          }
    }

    

    return (
        <div className={styles.right_column}>
            <div >
                <div className={styles.info_row}>
                    <textarea id='companyName_input' type={"text"} onBlur={lostFocus} onKeyDown={lostFocus} onInput={(e)=>setName(e.target.value)} disabled={true} value={newName}
                    className={classNames(styles.info_row_input, styles.center_text)}/>
                    {edit?(<img className={styles.ico_view} src={pencilIco} onClick={()=> editTextarea('companyName_input')}/>):(<p></p>)}
                </div>
                <div className={styles.info_row}>
                    <textarea id='companyLocation_input' type={"text"} onBlur={lostFocus} onKeyDown={lostFocus} onInput={(e)=>setLoc(e.target.value)}  disabled={true} value={newLoc}
                    className={classNames(styles.info_row_input, styles.center_text)}/>
                    {edit?(<img className={styles.ico_view} src={pencilIco} onClick={()=> editTextarea('companyLocation_input')}/>):(<p></p>)}
                </div>
            </div>
            
            <div className={styles.info_row}>
                {/*{edit?(<img className={styles.ico_view} src={pencilIco} onClick={()=> editLabel('industries_label')}/>):(<p></p>)}*/}
                <label className={styles.label_text_2}>Industries: </label>
                <label id='industries_label' className={styles.label_text}> {industriesNames}</label> 
            </div>
            <div className={styles.info_row}>
                {/*{edit?(<img className={styles.ico_view} src={pencilIco} onClick={()=> editLabel('technologies_label')}/>):(<p></p>)}*/}
                <label className={styles.label_text_2}>Technologies: </label>
                <label id='technologies_label' className={styles.label_text}>{technologiesNames}</label> 
            </div>
            <div className={styles.info_row}>
            <label className={styles.label_text_2}>Company Status:</label>
                {verified?(<label className={styles.green_text}>Verified</label>):(<label className={styles.alert_text}>Not Verified</label>)}
               
            </div>
            <div className={styles.info_row}>
                <label className={styles.label_text_2}>Company Status:</label>
                {banned?(<label className={styles.alert_text}>Banned</label>):(<label className={styles.green_text}>  Not Banned</label>)}
            </div>
        </div>
        
        
    ); 

}

export default CompanyTopInfo;