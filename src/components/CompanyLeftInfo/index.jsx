import React, {useState} from 'react';
import classNames from "../../commons/classnames";
import styles from './styles.module.sass';
import mailIco from '../../assets/mail_ico.png';
import phoneIco from '../../assets/phone_ico.png';
import pencilIco from '../../assets/pencil_ico.png';
import { useEffect } from 'react';
const CompanyLeftInfo = (props) => {
    const {        
        logoUrl,
        email,
        phone,
        description,
        edit,
        updateEmail,
        updatePhone,
        updateDesc,
    } = props;
    const [newEmail, setEmail] = useState("");
    const [newPhone, setPhone] = useState("");
    const [newDesc, setDesc] = useState("");
    

    useEffect(()=>{
        setEmail(email);
        setPhone(phone);
        setDesc(description);
    },[email, phone, description]);

    const editTextarea = (value) =>{
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
                updateEmail(newEmail);
                updatePhone(newPhone);
                updateDesc(newDesc);
                
            }         
          }
    }
    
    
    

    return (
        <div className={styles.left_column}>
                <div className={styles.centered}>
                <img className={styles.company_img} src={logoUrl}/>
                {edit?(<label className={classNames(styles.custom_file_input, styles.border_main)}>
                    <input type="file" />
                    <span>Upload photo</span>
                </label>):(<p></p>)}
                </div>
                
            
                
                <div className={styles.info_row}>
                    <img className={styles.ico_view} src={mailIco}/>
                    <textarea id='email_input' type={"text"} onBlur={lostFocus} onInput={(e)=>setEmail(e.target.value)} onKeyDown={lostFocus}  disabled={true} value={newEmail} className={classNames(styles.info_row_input, styles.center_text, styles.border_main)}/>
                    {edit?(<img className={styles.ico_view} src={pencilIco} onClick={()=> editTextarea('email_input')}/>):(<p></p>)}
                </div>
                <div className={styles.info_row}>
                    <img className={styles.ico_view} src={phoneIco}/>
                    <textarea id='phone_input' type={"text"} onBlur={lostFocus} onInput={(e)=>setPhone(e.target.value)} onKeyDown={lostFocus} disabled={true} value={newPhone} className={classNames(styles.info_row_input, styles.center_text, styles.border_main)}/>
                    {edit?(<img className={styles.ico_view} src={pencilIco} onClick={()=> editTextarea('phone_input')}/>):(<p></p>)}
                </div>
                <div className={styles.info_row}>                
                    <textarea id='description_input' type={"text"} onBlur={lostFocus} onKeyDown={lostFocus} onInput={(e)=>setDesc(e.target.value)} disabled={true} value={newDesc} className={classNames(styles.info_row_input, styles.description_input, styles.border_main)}/>
                    {edit?(<img className={styles.ico_view} src={pencilIco} onClick={()=> editTextarea('description_input')}/>):(<p></p>)}
                </div>
                
           
            </div>
        
        
    ); 

}

export default CompanyLeftInfo;