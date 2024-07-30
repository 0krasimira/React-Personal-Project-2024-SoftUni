import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './DestinationsList.module.css';

export default function DestinationsList() {
    const [destinations, setDestinations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const ITEMS_PER_PAGE = 6; // Number of items per page

    useEffect(() => {
        const fetchDestinations = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://localhost:3000/all-destinations?page=${currentPage}&limit=${ITEMS_PER_PAGE}`);
                const data = await response.json();
                
                // Assuming your API response includes a totalPages property
                setDestinations(data.destinations);
                setTotalPages(data.totalPages); // Set the total number of pages
                
            } catch (error) {
                setError('Error fetching destinations');
                console.error('Error fetching destinations:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDestinations();
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={styles.container}>
            {destinations.length === 0 ? (
                <p className={styles.noDestinations}>There are no destinations added yet.</p>
            ) : (
                <>
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

                    {/* Pagination Controls */}
                    <div className={styles.pagination}>
                        <button
                            className={styles.pageButton}
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            	&#8592;
                        </button>
                        <span className={styles.pageInfo}>Page {currentPage} of {totalPages}</span>
                        <button
                            className={styles.pageButton}
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            &#8594;	
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}


// todo - make all input fields 1 color; make the author clickable - leading to his/her profile
//todo continue from here - implement likes and search. then move on to profile. then move on to everything else - guards for manual entry of path and refactoring the code. check how to logout user once the jwt expires 