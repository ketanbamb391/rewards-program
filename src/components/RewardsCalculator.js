// src/components/RewardsCalculator.js

import React, { useState } from "react";
import { fetchTransactions } from "../services/fakeApi";
import { calculateRewardPoints } from "../utils/rewardCalculator";

function RewardsCalculator() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);  // State to store error message
  const [pointsData, setPointsData] = useState([]);

  const handleFetchData = async () => {
    setLoading(true);
    setError(null);  // Reset error state before fetching data

    try {
      const data = await fetchTransactions();
      setTransactions(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);  // Set the error message in state
    }
  };

  const handleCalculatePoints = () => {
    const data = transactions.map((transaction) => {
      const points = calculateRewardPoints(transaction.amount);
      return { ...transaction, points };
    });
    setPointsData(data);
  };

  return (
    <div>
      <h1>Customer Reward Points</h1>
      <button onClick={handleFetchData} disabled={loading}>
        {loading ? "Loading..." : "Fetch Transactions"}
      </button>

      {/* Display error message if there's an error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {transactions.length > 0 && !loading && (
        <div>
          <button onClick={handleCalculatePoints}>Calculate Points</button>
          <table>
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Amount Spent</th>
                <th>Reward Points</th>
              </tr>
            </thead>
            <tbody>
              {pointsData.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.name}</td>
                  <td>${transaction.amount}</td>
                  <td>{transaction.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default RewardsCalculator;
