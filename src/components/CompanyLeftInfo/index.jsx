import React from 'react';
import classNames from "../../commons/classnames";
import styles from './styles.module.sass';
import mailIco from '../../assets/mail_ico.png';
import phoneIco from '../../assets/phone_ico.png';
import pencilIco from '../../assets/pencil_ico.png';
const CompanyLeftInfo = (props) => {
    const {
        companyImgSrc,
        email,
        phone,
        description,
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
        <div className={styles.left_column}>
                <div className={styles.centered}>
                <img className={styles.company_img} src={companyImgSrc}/>
                {edit?(<label className={classNames(styles.custom_file_input, styles.border_main)}>
                    <input type="file" />
                    <span>Upload photo</span>
                </label>):(<p></p>)}
                </div>
                
            
                
                <div className={styles.info_row}>
                    <img className={styles.ico_view} src={mailIco}/>
                    <textarea id='email_input' type={"text"} onBlur={lostFocus} onKeyDown={lostFocus} onChange={handleTextareaInput} disabled={true} value={email} className={classNames(styles.info_row_input, styles.center_text, styles.border_main)}/>
                    {edit?(<img className={styles.ico_view} src={pencilIco} onClick={()=> editTextarea('email_input')}/>):(<p></p>)}
                </div>
                <div className={styles.info_row}>
                    <img className={styles.ico_view} src={phoneIco}/>
                    <textarea id='phone_input' type={"text"} onBlur={lostFocus} onKeyDown={lostFocus} disabled={true} value={phone} className={classNames(styles.info_row_input, styles.center_text, styles.border_main)}/>
                    {edit?(<img className={styles.ico_view} src={pencilIco} onClick={()=> editTextarea('phone_input')}/>):(<p></p>)}
                </div>
                <div className={styles.info_row}>                
                    <textarea id='description_input' type={"text"} onBlur={lostFocus} onKeyDown={lostFocus} disabled={true} value={description} className={classNames(styles.info_row_input, styles.description_input, styles.border_main)}/>
                    {edit?(<img className={styles.ico_view} src={pencilIco} onClick={()=> editTextarea('description_input')}/>):(<p></p>)}
                </div>
                
           
            </div>
        
        
    ); 

}

export default CompanyLeftInfo;