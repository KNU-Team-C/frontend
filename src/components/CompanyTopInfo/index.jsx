import React from 'react';
import classNames from "../../commons/classnames";
import styles from './styles.module.sass';

import pencilIco from '../../assets/pencil_ico.png';
const CompanyLeftInfo = (props) => {
    const {
        companyName,
        companyLocation,
        industries,
        technologies,
        edit
    } = props;
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
    const editLabel = (value) =>{
        console.log(value);
        
    }

    const handleTextareaInput = (event)=>{
        props.description = event.target.value;
    }

    const lostFocus = (event)=>{
        var element = event.target;
        //console.log(event.type);
        if (element) {
            if(event.type=='blur' || (event.type=='keydown'&&event.key === 'Enter')){
                element.disabled = true;   
            }         
          }
    }

    

    return (
        <div className={styles.right_column}>
            <div >
                <div className={styles.info_row}>
                    <textarea id='companyName_input' type={"text"} onBlur={lostFocus} onKeyDown={lostFocus} onChange={handleTextareaInput} disabled={true} value={companyName}
                    className={classNames(styles.info_row_input, styles.center_text)}/>
                    {edit?(<img className={styles.ico_view} src={pencilIco} onClick={()=> editTextarea('companyName_input')}/>):(<p></p>)}
                </div>
                <div className={styles.info_row}>
                    <textarea id='companyLocation_input' type={"text"} onBlur={lostFocus} onKeyDown={lostFocus} onChange={handleTextareaInput} disabled={true} value={companyLocation}
                    className={classNames(styles.info_row_input, styles.center_text)}/>
                    {edit?(<img className={styles.ico_view} src={pencilIco} onClick={()=> editTextarea('companyLocation_input')}/>):(<p></p>)}
                </div>
            </div>
            
            <div className={styles.info_row}>
                {edit?(<img className={styles.ico_view} src={pencilIco} onClick={()=> editLabel('industries_label')}/>):(<p></p>)}
                <label className={styles.label_text_2}>Industries: </label>
                <label id='industries_label' className={styles.label_text}> {industries}</label> 
            </div>
            <div className={styles.info_row}>
                {edit?(<img className={styles.ico_view} src={pencilIco} onClick={()=> editTextarea('technologies_label')}/>):(<p></p>)}
                <label className={styles.label_text_2}>Technologies: </label>
                <label id='technologies_label' className={styles.label_text}> {technologies}</label> 
            </div>
            <div className={styles.info_row}>
                <button className={classNames(styles.btn)}>Edit projects</button>
                <button className={classNames(styles.btn)}>Edit sets</button>
            </div>
        </div>
        
        
    ); 

}

export default CompanyLeftInfo;