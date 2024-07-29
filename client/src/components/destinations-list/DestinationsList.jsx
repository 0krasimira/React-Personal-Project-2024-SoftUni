import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './DestinationsList.module.css';

export default function DestinationsList() {
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const response = await fetch('http://localhost:3000/all-destinations');
                const data = await response.json();
                setDestinations(data);
            } catch (error) {
                console.error('Error fetching destinations:', error);
            }
        };

        fetchDestinations();
    }, []);

    return (
        <div className={styles.container}>
            {destinations.length === 0 ? (
                <p className={styles.noDestinations}>There are no destinations added yet.</p>
            ) : (
                <div className={styles.grid}>
                    {destinations.map(destination => (
                        <div key={destination._id} className={styles.card}>
                            <img src={destination.imageUrl} alt={destination.name} className={styles.image} />
                            <div className={styles.info}>
                                <h3 className={styles.name}>{destination.name}</h3>
                                <p className={styles.location}>{destination.location}</p>
                                <p className={styles.year}>Year of Discovery: {destination.yearOfDiscovery}</p>
                                <p className={styles.auth}>Added by: {' '}
                                    <span className={styles.authorName}>{destination.author?.username || 'Unknown'}</span>

                                </p>
                            </div>
                            <div className={styles.buttonContainer}>
                                <Link to={`/destinations/${destination._id}`} className={styles.button}>
                                    See More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}


// todo - make all input fields 1 color; make the author clickable - leading to his/her profile