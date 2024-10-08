import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './DestinationsList.module.css';

export default function DestinationsList() {
    const [destinations, setDestinations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [query, setQuery] = useState(''); // Used to trigger search

    const ITEMS_PER_PAGE = 6; // Number of items per page

    const fetchDestinations = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:3000/all-destinations?page=${currentPage}&limit=${ITEMS_PER_PAGE}&search=${encodeURIComponent(query)}`);
            const data = await response.json();

            setDestinations(data.destinations);
            setTotalPages(data.totalPages); // Set the total number of pages

        } catch (error) {
            setError('Error fetching destinations');
            console.error('Error fetching destinations:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDestinations(); // Trigger search when `query` changes
    }, [currentPage, query]);

    const handleSearch = () => {
        setQuery(searchQuery); // Set the search query and trigger useEffect
    };

    const handleClear = () => {
        setSearchQuery(''); // Clear the search input
        setQuery(''); // Reset the search query
        setDestinations([]); // Clear the destinations
        setCurrentPage(1); // Reset to first page

        // Fetch all destinations again
        fetchDestinations(); 
    };

    const handleInputFocus = () => {
        if (searchQuery === query) {
            setSearchQuery(''); // Clear the input if it matches the current query
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={styles.container}>
            <div className={styles.searchWrapper}>
                <div className={styles.searchInputWrapper}>
                    <input
                        type="text"
                        className={styles.searchInput}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={handleInputFocus}
                    />
                    <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
                </div>
                <div className={styles.buttonWrapper}>
                    <button className={styles.searchButton} onClick={handleSearch}>
                        Search
                    </button>
                    <button className={styles.clearButton} onClick={handleClear}>
                        Clear Search
                    </button>
                </div>
            </div>
            {destinations.length === 0 ? (
                <p className={styles.noDestinations}>No destinations found matching this criteria.</p>
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
                                    <p>
                                     <FontAwesomeIcon icon={faThumbsUp} style={{ marginRight: '8px', color: '#ff5d9e' }} />
                                     {destination.likes.length}  
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


