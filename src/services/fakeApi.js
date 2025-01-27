// src/services/fakeApi.js

const transactionsData = [
    { customerId: 1, name: "Alice", month: "January", amount: 120 },
    { customerId: 1, name: "Alice", month: "January", amount: 80 },
    { customerId: 2, name: "Bob", month: "January", amount: 150 },
    { customerId: 2, name: "Bob", month: "February", amount: 200 },
    { customerId: 1, name: "Alice", month: "February", amount: 90 },
    { customerId: 3, name: "Charlie", month: "March", amount: 55 },
  ];
  
  // Simulating an error (e.g., network issue) with a 50% chance
  export function fetchTransactions() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const shouldFail = Math.random() < 0.5;
        if (shouldFail) {
          reject(new Error("Failed to fetch transactions. Please try again."));
        } else {
          resolve(transactionsData);
        }
      }, 1000);
    });
  }
  