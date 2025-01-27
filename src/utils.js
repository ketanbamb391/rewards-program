// Function to calculate reward points for a given transaction amount
export const calculatePoints = (amount) => {
    let points = 0;
    if (amount > 100) {
      points += (amount - 100) * 2; // 2 points for every dollar over $100
      points += 50; // 1 point for each of the first $50
    } else if (amount > 50) {
      points += (amount - 50); // 1 point for each dollar between $50 and $100
    }
    return points;
  };
  
  // Function to calculate total points for a customer's transactions in a given month
  export const calculateMonthlyPoints = (transactions) => {
    return transactions.reduce((totalPoints, { amount }) => totalPoints + calculatePoints(amount), 0);
  };
  
  // Function to calculate total points for all customers
  export const calculateTotalPoints = (customers) => {
    return customers.reduce((totalPoints, customer) => {
      return totalPoints + customer.transactions.reduce((monthPoints, { amount }) => monthPoints + calculatePoints(amount), 0);
    }, 0);
  };
  