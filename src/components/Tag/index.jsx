import React from 'react';
import styles from './styles.module.sass';
import classNames from "../../commons/classnames";


const Tag = (props) => {
    const {
        isSelected,
        text,
        amount,
        onSelectionChange,
    } = props;
    return (
        <div className={classNames(styles.horizontal, styles.tag, styles.space_between)}>
            <div className={styles.horizontal}>
                <input type={"checkbox"} checked={isSelected} onChange={onSelectionChange}/>
                <div className={styles.tag_text}>{text}</div>
            </div>
            <div className={styles.tag_amount_text}>{amount}</div>
        </div>
    );
}

export default Tag;
