import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/authContext';
import DestinationItem from '../destination-item/DestinationItem';
import styles from './Profile.module.css';

const Profile = () => {
    const { userId } = useAuth();
    const [user, setUser] = useState(null);
    const [addedDestinations, setAddedDestinations] = useState([]);
    const [likedDestinations, setLikedDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newProfilePhoto, setNewProfilePhoto] = useState(null);
    const [uploadError, setUploadError] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(null);
    const [fileName, setFileName] = useState('No file chosen');

    useEffect(() => {
        const fetchUserAndDestinations = async () => {
            try {
                const response = await fetch(`http://localhost:3000/auth/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data.');
                }

                const userData = await response.json();
                console.log('Fetched user data:', userData); // Add this line for debugging
                setUser(userData);
                setAddedDestinations(userData.destinations || []);
                setLikedDestinations(userData.likedDestinations || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserAndDestinations();
    }, [userId]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setNewProfilePhoto(file);
        setFileName(file ? file.name : 'No file chosen');
    };

    const handleUpload = async () => {
        if (!newProfilePhoto) return;
    
        const formData = new FormData();
        formData.append('profilePhoto', newProfilePhoto);
    
        try {
            const response = await fetch(`http://localhost:3000/auth/${userId}/upload-profile-photo`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            });
    
            if (!response.ok) {
                throw new Error('Failed to upload profile photo.');
            }
    
            const result = await response.json();
            console.log(user.profilePhoto);

            setUser(prevUser => ({ ...prevUser, profilePhoto: result.profilePhoto }));
            setNewProfilePhoto(null);
            setFileName('No file chosen');

        } catch (err) {
            console.error('Error uploading profile photo:', err);
            setUploadError('Error uploading profile photo.');
        }
    };
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!user) return <div>No user data available</div>;

    console.log('profile photo', user.profilePhoto);

    return (
        
        <div className={styles.container}>
            <div className={styles.profileSection}>
                <div className={styles.profileHeader}>
                    <img 
                        src={user.profilePhoto !== '/images/profile_photo.png' ? `http://localhost:3000/${user.profilePhoto}` : `/images/profile_photo.png`} 
                        alt="Profile" 
                        className={styles.profilePhoto} 
                    />
                    <div>
                        <h1 className={styles.username}>{user.username}</h1>
                        <p><strong>Email:</strong> {user.email}</p>
                    </div>
                </div>
                <div className={styles.fileInputWrapper}>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        className={styles.fileInput}
                        id="profilePhotoInput"
                    />
                    <label 
                        htmlFor="profilePhotoInput" 
                        className={styles.fileInputLabel}
                    >
                        Choose Image
                    </label>
                    <p className={styles.fileName}>{fileName}</p>
                    <button 
                        onClick={handleUpload} 
                        className={styles.uploadButton}
                    >
                        Upload Photo
                    </button>
                </div>
                {uploadSuccess && <p className={`${styles.successMessage} ${styles.fadeOut}`}>{uploadSuccess}</p>}
                {uploadError && <p className={styles.errorMessage}>{uploadError}</p>}
                <div className={styles.profileContent}>
                    <div className={styles.listContainer}>
                        <h2>My Added Destinations</h2>
                        {addedDestinations.length === 0 ? (
                            <p>
                                You have not added any destinations yet. 
                                <a href="/add-destination" className={styles.addButton}>Add your first one here</a>
                            </p>
                        ) : (
                            <div className={styles.horizontalScroll}>
                                {addedDestinations.map(destination => (
                                    <DestinationItem 
                                        key={destination._id}
                                        destination={destination} 
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    <div className={styles.listContainer}>
                        <h2>My Liked Destinations</h2>
                        {likedDestinations.length === 0 ? (
                            <p>You have not liked any destinations yet.</p>
                        ) : (
                            <div className={styles.horizontalScroll}>
                                {likedDestinations.map(destination => (
                                    <DestinationItem 
                                        key={destination._id}
                                        destination={destination} 
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
