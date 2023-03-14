import React from 'react';
import styles from './styles.module.sass';
import classNames from "../../commons/classnames";


const Checkbox = (props) => {
    const {
        label,
    } = props;
    return (
        <div className={classNames(styles.horizontal, props.className)}>
            <input {...props} type={"checkbox"} className={''}/>
            <div className={styles.label_text}>{label}</div>
        </div>
    );
}

export default Checkbox;
