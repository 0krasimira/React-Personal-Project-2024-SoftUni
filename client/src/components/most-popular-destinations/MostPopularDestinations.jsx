import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './MostPopularDestinations.module.css';

export default function MostPopularDestinations() {
  const [mostPopularSites, setMostPopularSites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMostPopularSites = async () => {
      try {
        const response = await fetch('http://localhost:3000/most-popular');
        const data = await response.json();
        setMostPopularSites(data);
      } catch (error) {
        console.error('Error fetching most popular sites:', error);
      }
    };

    fetchMostPopularSites();
  }, []);

  const seeMore = (site) => {
    navigate(`/destinations/${site._id}`);
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.mostPopular}>
        <h2>Most Popular Destinations</h2>
        {mostPopularSites.length > 0 ? (
          mostPopularSites.map(site => (
            <div key={site._id} className={styles.popularSite}>
              <div className={styles.siteInfo}>
                <div className={styles.siteDetails}>
                  <h3>{site.name}</h3>
                  <p>
                    Date Added: {new Date(site.createdAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                  <p>Likes: {site.likes?.length}</p>
                  <p>Added by: <span className={styles.addedBy}>{site.author.username}</span></p>
                </div>
                <div className={styles.imageContainer}>
                  <img src={site.imageUrl} alt="Site Image" className={styles.siteImage} />
                  <button onClick={() => seeMore(site)} className={styles.seeMoreButton}>See More</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No popular sites available.</p>
        )}
        <Link to="/all-destinations" className={styles.seeAllSites}>See All Destinations</Link>
      </div>
    </aside>
  );
}
