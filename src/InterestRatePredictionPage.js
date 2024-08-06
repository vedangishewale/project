import React, { useState } from 'react';
import './InterestRatePredictionPage.css';

const InterestRatePredictionPage = () => {
  const [formData, setFormData] = useState({
    Beacon_Score: '',
    Services: '',
    Avg_Monthly_Transactions: '',
    Has_Payroll: '',
    Has_Investment: '',
    Has_Visa: '',
    Age: '',
    Tenure_In_Months: '',
    TermToMaturity: '',
    NumberOfParties: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPrediction(null);

    try {
      const response = await fetch('http://127.0.0.1:5000/predictinterestrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setPrediction(data.interest_rate);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Error making prediction. Please try again later.');
    }
  };

  return (
    <div className="predict-form-container">
      <h2>Predict Interest Rate</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div className="form-group" key={key}>
            <label>{key.replace(/_/g, ' ')}:</label>
            <input
              type="number"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Predict</button>
      </form>
      {prediction && (
        <div className="result">
          <h3>Predicted Interest Rate: {prediction}</h3>
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default InterestRatePredictionPage;