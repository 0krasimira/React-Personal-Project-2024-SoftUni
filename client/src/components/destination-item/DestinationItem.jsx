// src/components/destinations-list/DestinationItem.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import styles from './DestinationItem.module.css'; // Import the CSS for the item

const DestinationItem = ({ destination }) => {
    if (!destination) {
        return <div className={styles.card}>Destination data is missing or incomplete.</div>;
    }

    return (
        <div className={styles.card}>
            <img src={destination.imageUrl} alt={destination.name} className={styles.image} />
            <div className={styles.info}>
                <h3 className={styles.name}>{destination.name}</h3>
                <p className={styles.location}>{destination.location}</p>
                <p className={styles.year}>Year of Discovery: {destination.yearOfDiscovery}</p>
                <p className={styles.auth}>Added by: <span className={styles.authorName}>{destination.author?.username || 'Unknown'}</span></p>
                <p>
                    <FontAwesomeIcon icon={faThumbsUp} style={{ marginRight: '8px', color: '#ff5d9e' }} />
                    {destination.likes?.length || 0}
                </p>
            </div>
            <div className={styles.buttonContainer}>
                <Link to={`/destinations/${destination._id}`} className={styles.button}>
                    See More
                </Link>
            </div>
        </div>
    );
};

export default DestinationItem;


