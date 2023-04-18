import React from 'react';
import styles from './styles.module.sass';
import classNames from "../../commons/classnames";
import placeholder from '../../assets/image-placeholder.png';


const GenericCard = (props) => {
    const {
        cardHeader,
        itemHeader,
        image,
        infoItems,
        details,
        controls,
        onCardClick,
        subHeader,
    } = props;

    console.log(onCardClick)

    return (
        <div className={classNames(styles.vertical, styles.card)} onClick={onCardClick}
            style={onCardClick !== undefined ? { cursor: 'pointer' } : null}>
            {cardHeader}
            <div className={styles.horizontal}>
                <div>
                    <img src={image || placeholder} className={styles.request_image} alt={'card image'} />
                </div>
                <div className={styles.vertical}>
                    <div className={styles.item_header}>{itemHeader}</div>
                    {subHeader}
                    {infoItems.map(item => (
                        <div key={item.title} className={styles.horizontal}>
                            <div className={styles.request_point}>{item.title}:</div>
                            <div className={styles.default_text}>{item.content}</div>
                        </div>
                    ))}
                    <div className={styles.horizontal}>
                        <pre className={styles.button_details}>{details}</pre>
                    </div>
                </div>
            </div>
            <div className={classNames(styles.horizontal, styles.controls)}>
                {controls.map(c => (
                    <button
                        className={classNames(c.className, styles.button_common)}
                        onClick={c.onClick}
                        key={c.text}
                    >
                        {c.text}
                    </button>
                ))}
            </div>
        </div>
    );
}

GenericCard.defaultProps = {
    controls: [],
}

export default GenericCard;
