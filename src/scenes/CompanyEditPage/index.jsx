import React from 'react';

import styles from './styles.module.sass';
import CompanyLeftInfo from '../../components/CompanyLeftInfo';
import CompanyTopInfo from '../../components/CompanyTopInfo';


const CompanyEditPage = () => {
    return (
        <div className={styles.main_row}>
           
                <CompanyLeftInfo 
                email={"example@gmail.com"}
                phone={"+380999999999"}
                description={"example description of this company."}
                edit={true}
                companyImgSrc={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmIOwOnuCEsJWQ-tRQ9G8yJsmkulH0-Ck8Jae58R5w&s"}
                ></CompanyLeftInfo>
                <CompanyTopInfo
                companyName={"Company name"}
                companyLocation={"Kuiv, Ukraine"}
                industries={"Digital Marketing, Data and Analytics"}
                technologies={"Python, Django"}
                edit={true}
                ></CompanyTopInfo>
                
        </div>
        
    ); 

}

export default CompanyEditPage;