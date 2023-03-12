import React from 'react';
import styles from './styles.module.sass';
import classNames from "../../commons/classnames";


const TagFilter = (props) => {
    const {
        title,
        children,
        onInput,
        onReset
    } = props;
    return (
        <div className={styles.vertical}>
            <div className={classNames(styles.horizontal, styles.space_between)}>
                <div className={styles.title_text}>{title}</div>
                <div className={styles.button_reset} onClick={onReset}>Reset</div>
            </div>
            <div className={classNames(styles.tags_border, styles.vertical)}>
                <input type={"text"} placeholder={"Search..."} className={styles.search} onInput={onInput}/>
                {children}
            </div>
        </div>
    );
}

export default TagFilter;
