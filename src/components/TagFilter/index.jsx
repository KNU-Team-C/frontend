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
        <div className={classNames(styles.vertical, props.className)}>
            <div className={classNames(styles.horizontal, styles.top_container)}>
                <div className={styles.title_text}>{title}</div>
                <button className={styles.button_reset} onClick={onReset}>Reset</button>
            </div>
            <div className={classNames(styles.tags_border, styles.vertical)}>
                <input type={"text"} placeholder={"Search..."} className={styles.search} onInput={onInput}/>
                {children}
            </div>
        </div>
    );
}

export default TagFilter;
