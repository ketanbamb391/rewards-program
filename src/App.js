import React, { useEffect, useState } from 'react';
import Customer from './Customer';
import { calculateTotalPoints } from './utils';

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulating an API call to fetch customer data
  useEffect(() => {
    setTimeout(() => {
      const fakeData = [
        {
          customerId: "1",
          customerName: "John Doe",
          transactions: [
            { amount: 120, month: "January" },
            { amount: 90, month: "January" },
            { amount: 130, month: "February" },
            { amount: 75, month: "March" },
          ]
        },
        {
          customerId: "2",
          customerName: "Jane Smith",
          transactions: [
            { amount: 150, month: "January" },
            { amount: 60, month: "February" },
            { amount: 80, month: "March" },
          ]
        }
      ];
      setCustomers(fakeData);
      setLoading(false);
    }, 2000); // Simulate a 2-second delay
  }, []);

  // Render loading state while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Customer Rewards Points</h1>
      {customers.map((customer) => (
        <Customer key={customer.customerId} customer={customer} />
      ))}
      <h2>Total Points: {calculateTotalPoints(customers)}</h2>
    </div>
  );
};

export default App;
