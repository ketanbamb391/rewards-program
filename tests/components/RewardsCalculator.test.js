// components/RewardsCalculator.test.js

import { render, screen, waitFor } from "@testing-library/react";
import RewardsCalculator from "./RewardsCalculator";

test("displays reward points correctly after data is fetched", async () => {
  render(<RewardsCalculator />);

  await waitFor(() => screen.getByText("Alice"));
  expect(screen.getByText("Alice")).toBeInTheDocument();
  expect(screen.getByText("January")).toBeInTheDocument();
  expect(screen.getByText("90")).toBeInTheDocument();
});
