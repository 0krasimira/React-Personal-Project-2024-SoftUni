import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import MostPopularDestinations from '../most-popular-destinations/MostPopularDestinations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'; // Import the thumbs-up icon
import styles from './DestinationsDetails.module.css';

export default function DestinationsDetails() {
    const { destinationId } = useParams();
    const { userId } = useAuth(); // Access userId from AuthContext
    const [destination, setDestination] = useState(null);
    const [error, setError] = useState('');
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const [showAllComments, setShowAllComments] = useState(false);
    const [expandedComments, setExpandedComments] = useState({});
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchDestination = async () => {
            try {
                const response = await fetch(`http://localhost:3000/destinations/${destinationId}`);
                const data = await response.json();
                if (!response.ok) throw new Error(data.error || 'Failed to fetch destination details');

                // Check if the author data is present
                if (data && data.author) {
                    setDestination(data);
                    setComments(data.comments || []);
                } else {
                    setError('Destination data is incomplete.');
                }
            } catch (err) {
                setError(err.message);
            }
        };

        fetchDestination();
    }, [destinationId]);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!userId) {
            setError('You must be logged in to post a comment.');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/destinations/${destinationId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ text: newComment, authorId: userId }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to post comment');
            setComments([data.comment, ...comments]); // Add new comment to the top
            setNewComment('');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleLike = async () => {
        if (!userId) {
            setError('You must be logged in to like/unlike destinations.');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/destinations/${destinationId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ userId }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to like/unlike destination');
            setDestination(data.destination); // Update the destination with the new like state
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEdit = () => {
        navigate(`/destinations/${destinationId}/edit`); // Redirect to the edit page
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this destination?')) return;
    
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/destinations/${destinationId}/delete`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
    
            if (response.ok) {
                alert('Destination deleted successfully!');
                navigate('/all-destinations'); // Redirect to the destinations list
            } else {
                const contentType = response.headers.get('content-type');
                let errorMessage = 'Failed to delete destination';
    
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    errorMessage = data.error || errorMessage;
                }
    
                throw new Error(errorMessage);
            }
        } catch (err) {
            setError(err.message);
        }
    };
    

    const formatTime = (date) => {
        const now = new Date();
        const commentDate = new Date(date);
        const differenceInMs = now - commentDate;
        const differenceInHours = Math.floor(differenceInMs / (1000 * 60 * 60));
        const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60));

        if (differenceInHours < 1) {
            return `${differenceInMinutes} minute${differenceInMinutes > 1 ? 's' : ''} ago`;
        } else if (differenceInHours < 24) {
            return `${differenceInHours} hour${differenceInHours > 1 ? 's' : ''} ago`;
        } else {
            return commentDate.toLocaleDateString();
        }
    };

    const toggleCommentExpansion = (commentId) => {
        setExpandedComments((prev) => ({
            ...prev,
            [commentId]: !prev[commentId]
        }));
    };

    const truncateText = (text, commentId) => {
        if (text.length > 100) {
            return (
                <div>
                    {expandedComments[commentId] ? (
                        <p>{text}</p>
                    ) : (
                        <p>{text.substring(0, 100)}...
                            <button onClick={() => toggleCommentExpansion(commentId)} className={styles.showMoreButton}>Read more</button>
                        </p>
                    )}
                    {expandedComments[commentId] && (
                        <button onClick={() => toggleCommentExpansion(commentId)} className={styles.showLessButton}>Show less</button>
                    )}
                </div>
            );
        } else {
            return <p>{text}</p>;
        }
    };

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    if (!destination) {
        return <div className={styles.loading}>Loading...</div>;
    }

    const displayedComments = showAllComments ? comments : comments.slice(0, 3);

    return (
        <div className={styles.container}>
            <div className={styles.details}>
                <h1 className={styles.title}>{destination.name}</h1>
                <img src={destination.imageUrl} alt={destination.name} className={styles.image} />
                <div className={styles.info}>
                    <p><strong>Location:</strong> {destination.location}</p>
                    <p><strong>Year of Discovery:</strong> {destination.yearOfDiscovery}</p>
                    <p><strong>Added by:</strong> {destination.author?.username || 'Unknown'}</p>
                    <p><strong>Previous Investigations:</strong> {destination.prevInvestigations}</p>
                </div>

                {/* Conditionally render edit and delete buttons */}
                {destination.author?._id === userId && (
                    <div className={styles.actions}>
                    <button onClick={handleEdit} className={`${styles.button} ${styles.editButton}`}>Edit</button>
                    <button onClick={handleDelete} className={`${styles.button} ${styles.deleteButton}`}>Delete</button>
                </div>
                )}

                <div className={styles.likesSection}>
                    <button
                        className={styles.likeButton}
                        onClick={handleLike}
                    >
                        <FontAwesomeIcon icon={faThumbsUp} style={{ marginRight: '8px' }} />
                        {destination.likedBy?.includes(userId) ? 'Unlike' : 'Give it a like!'}
                    </button>
                    <span className={styles.likeCount}>{destination.likes?.length || 0} Likes</span>
                </div>

                <div className={styles.commentsSection}>
                    <h2 className={styles.commentsTitle}>Comments</h2>
                    <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
                        <textarea
                            value={newComment}
                            onChange={handleCommentChange}
                            placeholder="Leave a comment..."
                            className={styles.commentInput}
                            required
                        />
                        <button type="submit" className={styles.commentButton}>Post Comment</button>
                    </form>
                    <div className={styles.commentsList}>
                        {displayedComments.length === 0 ? (
                            <p>No comments yet. Be the first person to add a comment.</p>
                        ) : (
                            displayedComments.map((comment, index) => (
                                <div key={comment._id || `comment-${index}`} className={styles.comment}>
                                    <div className={styles.commentText}>
                                        {truncateText(comment.text, comment._id || `comment-${index}`)}
                                    </div>
                                    <p className={styles.commentAuthor}>
                                        <strong>
                                            {comment.author?.username || 'Anonymous'}
                                            {comment.author?._id === destination.author?._id && (
                                                <span className={styles.authorTag}> Author</span>
                                            )}
                                        </strong>
                                    </p>
                                    <p className={styles.commentTime}>{formatTime(comment.createdAt)}</p>
                                </div>
                            ))
                        )}
                        {comments.length > 3 && (
                            <button
                                className={styles.seeAllButton}
                                onClick={() => setShowAllComments(!showAllComments)}
                            >
                                {showAllComments ? 'Show Less' : 'See All Comments'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <aside className={styles.sidebar}>
                <MostPopularDestinations />
            </aside>
        </div>
    );
}
