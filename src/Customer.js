import React from 'react';
import Transaction from './Transaction';
import { calculateMonthlyPoints } from './utils';

const Customer = ({ customer }) => {
  const { customerName, transactions } = customer;

  return (
    <div>
      <h2>{customerName}</h2>
      {["January", "February", "March"].map((month) => {
        const monthTransactions = transactions.filter(
          (transaction) => transaction.month === month
        );
        const monthPoints = calculateMonthlyPoints(monthTransactions);
        return (
          <div key={month}>
            <h3>{month}</h3>
            {monthTransactions.map((transaction, index) => (
              <Transaction key={index} transaction={transaction} />
            ))}
            <p>Points: {monthPoints}</p>
          </div>
        );
      })}
      <hr />
    </div>
  );
};

export default Customer;
