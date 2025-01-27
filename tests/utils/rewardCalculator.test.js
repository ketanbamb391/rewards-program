// utils/rewardCalculator.test.js

import { calculateRewardPoints } from "./rewardCalculator";

test("calculates reward points for a purchase over 100", () => {
  expect(calculateRewardPoints(120)).toBe(90); // 2*20 + 1*50 = 90
});

test("calculates reward points for a purchase between 50 and 100", () => {
  expect(calculateRewardPoints(80)).toBe(30); // 1*30 = 30
});

test("calculates reward points for a purchase less than 50", () => {
  expect(calculateRewardPoints(45)).toBe(0); // No points
});
