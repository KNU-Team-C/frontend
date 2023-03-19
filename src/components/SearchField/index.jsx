import React from 'react';
import styles from './styles.module.sass';
import classNames from "../../commons/classnames";
import { Input, Icon } from 'semantic-ui-react';


const SearchField = (props) => {
    const {
        className,
        onInput,
        onSearchClick
    } = props;
    return (
        <div className={classNames(styles.horizontal, className)}>
            <Input
                placeholder={"Search..."}
                className={styles.search}
                onInput={onInput} />
            <button className={classNames(styles.search_border, styles.search_button, styles.search_text)}
                onClick={onSearchClick}>
                <Icon name="search"/>
            </button>
        </div>
    );
}

export default SearchField;
