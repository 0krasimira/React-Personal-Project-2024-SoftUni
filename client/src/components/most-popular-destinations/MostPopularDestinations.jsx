import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext'; 
import styles from './MostPopularDestinations.module.css';

export default function MostPopularDestinations() {
  const { isLoggedIn } = useAuth(); 
  const [mostPopularDestinations, setMostPopularDestinations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMostPopularDestinations = async () => {
      try {
        const response = await fetch('http://localhost:3000/most-popular');
        const data = await response.json();
        setMostPopularDestinations(data);
      } catch (error) {
        console.error('Error fetching most popular destinations:', error);
      }
    };

    fetchMostPopularDestinations();
  }, []);

  const seeMore = (destination) => {
    navigate(`/destinations/${destination._id}`);
  };

  const goToProfile = (userId) => {
    if (isLoggedIn) {
      navigate(`/auth/${userId}`);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.mostPopular}>
        <h2>Most Popular Destinations</h2>
        {mostPopularDestinations.length > 0 ? (
          mostPopularDestinations.map(destination => (
            <div key={destination._id} className={styles.popularDestination}>
              <div className={styles.destinationInfo}>
                <div className={styles.destinationDetails}>
                  <h3>{destination.name}</h3>
                  <p>Date Added: {formatDate(destination.createdAt)}</p>
                  <p>Likes: {destination.likes?.length}</p>
                  <p>
                    Added by: <span 
                      className={`${styles.addedBy} ${isLoggedIn ? styles.clickable : ''}`} 
                      onClick={() => isLoggedIn && goToProfile(destination.author._id)}
                    >
                      {destination.author.username}
                    </span>
                  </p>
                </div>
                <div className={styles.imageContainer}>
                  <img src={destination.imageUrl} alt="Destination Image" className={styles.destinationImage} />
                  <button onClick={() => seeMore(destination)} className={styles.seeMoreButton}>See More</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No popular destinations available.</p>
        )}
        <Link to="/all-destinations" className={styles.seeAllDestinations}>See All Destinations</Link>
      </div>
    </aside>
  );
}
