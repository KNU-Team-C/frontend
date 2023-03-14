import React from 'react';
import styles from './styles.module.sass';
import classNames from "../../commons/classnames";


const SearchField = (props) => {
    const {
        className,
        onInput,
        onSearchClick
    } = props;
    return (
        <div className={classNames(styles.horizontal,className)}>
            <input type={"text"}
                   placeholder={"Search..."}
                   className={classNames(styles.search_border, styles.search)}
                   onInput={onInput}/>
            <button className={classNames(styles.search_border, styles.search_button, styles.search_text)}
                    onClick={onSearchClick}>
                Go
            </button>
        </div>
    );
}

export default SearchField;
