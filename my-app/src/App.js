// App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(parseFloat(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Phone:", phone);
    console.log("Review:", review);
    console.log("Rating:", rating);

    const formEle = document.querySelector("form");
    const formDatab = new FormData(formEle);
    fetch(
      "https://script.google.com/macros/s/AKfycbwfpgZtwpVMCJy1Kgbdfenn1AvHCkrydnWCB6YVAGGDW26XIClz4Atg2ETuAzBtfWjM/exec",
      {
        method: "POST",
        body: formDatab
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  
    setShowSuccess(true);
    setName('');
    setEmail('');
    setPhone('');
    setReview('');
    setRating(0);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="container">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h2>LearnTrafficRules.org</h2>
          <h3>Review Form</h3>
          <div className="input-box">
            <input type="text" placeholder="Name" value={name} name="name" onChange={handleNameChange} required />
          </div>
          <div className="input-box">
            <input type="email" placeholder="Email" value={email} name="email" onChange={handleEmailChange} required />
          </div>
          <div className="input-box">
            <input type="tel" placeholder="Phone" value={phone} name="phone" onChange={handlePhoneChange} required />
          </div>
          <div>
            <p>How much would you like to rate our course?</p>
          </div>
          <div className="rating-input">
            <input 
              type="range" 
              min="0" 
              max="5" 
              step="0.1" 
              value={rating} 
              onChange={handleRatingChange} 
              name="rating" 
              required 
            />
            <span>{rating.toFixed(1)}</span>
          </div>
          <div className="input-box">
            <textarea
              placeholder="Write your review here..."
              value={review}
              name="review"
              onChange={handleReviewChange}
              required
            />
          </div>
          <button type="submit" className="btn">Submit Review</button>
          <div className="register-link">
          </div>
        </form>
        {showSuccess && <div className="success-message">Review submitted successfully!</div>}
      </div>
    </div>
  );
}

export default App;
