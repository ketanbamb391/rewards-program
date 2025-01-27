import React from 'react';

const Transaction = ({ transaction }) => {
  return (
    <div>
      <p>Amount: ${transaction.amount}</p>
    </div>
  );
};

export default Transaction;
