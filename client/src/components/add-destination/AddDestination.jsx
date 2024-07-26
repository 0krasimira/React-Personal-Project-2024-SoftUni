import React, { useState } from 'react';
import styles from './AddDestination.module.css'; // Ensure you have the correct path

export default function AddDestination() {
  const [form, setForm] = useState({
    name: '',
    location: '',
    yearOfDiscovery: '',
    prevInvestigations: '',
    imageUrl: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});
  
    // Basic validation
    const newErrors = {};
    if (!form.name) newErrors.name = 'Destination name is required.';
    if (!form.location) newErrors.location = 'Location is required.';
    if (!form.yearOfDiscovery) newErrors.yearOfDiscovery = 'Year of discovery is required.';
    if (!form.prevInvestigations) newErrors.prevInvestigations = 'Previous investigations are required.';
    if (!form.imageUrl) newErrors.imageUrl = 'Image URL is required.';
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    try {
      const token = localStorage.getItem('token'); // Adjust according to your token storage
  
      const response = await fetch('http://localhost:3000/add-destination', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Ensure this matches your backend's expectation
        },
        body: JSON.stringify(form),
      });
  
      const data = await response.json();
  
      console.log('data', data)
      if (!response.ok) {
        // If the response is not OK, handle the error
        throw new Error(data.error || 'Failed to add destination.');
      }
  
      // Handle successful form submission
      alert('Destination added successfully!');
      setForm({
        name: '',
        location: '',
        yearOfDiscovery: '',
        prevInvestigations: '',
        imageUrl: '',
      });
    } catch (error) {
      console.error('Error:', error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className={styles.wrapper}>
      <header>Add New Destination</header>
      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="name">Destination Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Destination Name"
            value={form.name}
            onChange={handleChange}
            required
            className={styles.inputField} // Apply the .inputField class
          />
          {errors.name && <div className={styles.errorTxt}>{errors.name}</div>}
        </div>

        <div className={styles.field}>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
            className={styles.inputField} // Apply the .inputField class
          />
          {errors.location && <div className={styles.errorTxt}>{errors.location}</div>}
        </div>

        <div className={styles.field}>
          <label htmlFor="yearOfDiscovery">Year of Discovery</label>
          <select
            id="yearOfDiscovery"
            name="yearOfDiscovery"
            value={form.yearOfDiscovery}
            onChange={handleChange}
            required
            className={styles.inputField} // Apply the .inputField class
          >
            <option value="" disabled>Select a year</option>
            {Array.from({ length: new Date().getFullYear() - 1878 + 1 }, (_, i) => 1878 + i)
              .reverse()
              .map(year => (
                <option key={year} value={year}>{year}</option>
              ))
            }
          </select>
          {errors.yearOfDiscovery && <div className={styles.errorTxt}>{errors.yearOfDiscovery}</div>}
        </div>

        <div className={styles.field}>
          <label htmlFor="prevInvestigations">Previous Investigations</label>
          <textarea
            id="prevInvestigations"
            name="prevInvestigations"
            placeholder="Previous Investigations"
            value={form.prevInvestigations}
            onChange={handleChange}
            required
            className={styles.inputField} // Apply the .inputField class
          ></textarea>
          {errors.prevInvestigations && <div className={styles.errorTxt}>{errors.prevInvestigations}</div>}
        </div>

        <div className={styles.field}>
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            placeholder="https://your-image-here.com"
            value={form.imageUrl}
            onChange={handleChange}
            required
            className={styles.inputField} // Apply the .inputField class
          />
          {errors.imageUrl && <div className={styles.errorTxt}>{errors.imageUrl}</div>}
        </div>

        <input type="submit" value="Add Destination" className={styles.submitButton} />
      </form>
    </div>
  );
}


//todo - redirect to destinations list once added successfully
