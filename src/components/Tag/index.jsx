import React from 'react';
import styles from './styles.module.sass';
import classNames from "../../commons/classnames";
import Checkbox from "../Checkbox";


const Tag = (props) => {
    const {
        isSelected,
        text,
        amount,
        onSelectionChange,
    } = props;
    return (
        <div className={classNames(styles.horizontal, styles.tag, styles.space_between)}>
            <Checkbox checked={isSelected} onChange={onSelectionChange} label={text}/>
            <div className={styles.tag_amount_text}>{amount}</div>
        </div>
    );
}

export default Tag;
