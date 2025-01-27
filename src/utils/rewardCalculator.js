// utils/rewardCalculator.js

export function calculateRewardPoints(purchaseAmount) {
    let points = 0;
  
    if (purchaseAmount > 100) {
      points += (purchaseAmount - 100) * 2; // 2 points for every dollar over $100
      purchaseAmount = 100;
    }
  
    if (purchaseAmount > 50) {
      points += (purchaseAmount - 50) * 1; // 1 point for every dollar between $50 and $100
    }
  
    return points;
  }
  