import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import RewardsCalculator from "./RewardsCalculator";
import { fetchTransactions } from "../services/fakeApi";
import { calculateRewardPoints } from "../utils/rewardCalculator";

// Mock the fetchTransactions function
jest.mock("../services/fakeApi");

describe("RewardsCalculator Component Tests", () => {
  // Positive Test Cases
  test("should display reward points correctly after data is fetched and calculated", async () => {
    // Mock the successful response of the API
    const mockData = [
      { id: 1, name: "Alice", amount: 100 },
      { id: 2, name: "Bob", amount: 50 },
    ];
    fetchTransactions.mockResolvedValue(mockData);

    render(<RewardsCalculator />);

    // Simulate fetching data
    fireEvent.click(screen.getByText(/Fetch Transactions/i));

    // Wait for the customer data to be displayed
    await waitFor(() => screen.getByText("Alice"));

    // Click "Calculate Points"
    fireEvent.click(screen.getByText(/Calculate Points/i));

    // Wait for the points to be displayed
    await waitFor(() => screen.getByText("90"));  // Alice's points
    await waitFor(() => screen.getByText("50"));  // Bob's points

    // Check if the points are calculated correctly
    expect(screen.getByText("90")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
  });

  test("should handle no transactions data gracefully", async () => {
    // Mock the response to be an empty array
    fetchTransactions.mockResolvedValue([]);

    render(<RewardsCalculator />);

    // Simulate fetching data
    fireEvent.click(screen.getByText(/Fetch Transactions/i));

    // Wait for the empty state
    await waitFor(() => screen.getByText("No transactions available"));

    // Check if the no transactions message is displayed
    expect(screen.getByText("No transactions available")).toBeInTheDocument();
  });

  test("should handle API errors and show error message", async () => {
    // Mock the fetch to reject (simulate an error)
    fetchTransactions.mockRejectedValue(new Error("Failed to fetch transactions"));

    render(<RewardsCalculator />);

    // Simulate fetching data
    fireEvent.click(screen.getByText(/Fetch Transactions/i));

    // Wait for the error message
    await waitFor(() => screen.getByText("Failed to fetch transactions"));

    // Check if the error message is shown
    expect(screen.getByText("Failed to fetch transactions")).toBeInTheDocument();
  });

  // Negative Test Cases
  test("should not display points when no data is fetched", async () => {
    fetchTransactions.mockResolvedValue([]);  // No transactions data

    render(<RewardsCalculator />);

    // Simulate fetching data
    fireEvent.click(screen.getByText(/Fetch Transactions/i));

    // Wait for the customer list to be empty
    await waitFor(() => expect(screen.queryByText("Alice")).toBeNull());
    await waitFor(() => expect(screen.queryByText("Bob")).toBeNull());

    // Check if points are not displayed
    expect(screen.queryByText("90")).toBeNull();
    expect(screen.queryByText("50")).toBeNull();
  });

  test("should not crash if transaction data has missing or malformed fields", async () => {
    // Mock data with missing or malformed fields
    const mockData = [
      { id: 1, name: "Alice", amount: 100 },
      { id: 2, name: "Bob" }, // Missing 'amount' field
    ];
    fetchTransactions.mockResolvedValue(mockData);

    render(<RewardsCalculator />);

    // Simulate fetching data
    fireEvent.click(screen.getByText(/Fetch Transactions/i));

    // Wait for the customer data to load
    await waitFor(() => screen.getByText("Alice"));

    // Click "Calculate Points"
    fireEvent.click(screen.getByText(/Calculate Points/i));

    // Check if the reward points are only calculated for valid data
    await waitFor(() => expect(screen.getByText("90")).toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText("Bob")).toBeNull()); // Bob should not have points
  });

  test("should show loading state when data is being fetched", async () => {
    // Mock the fetch to simulate a delay
    fetchTransactions.mockResolvedValueOnce([
      { id: 1, name: "Alice", amount: 100 },
      { id: 2, name: "Bob", amount: 50 },
    ]);

    render(<RewardsCalculator />);

    // Simulate fetching data
    fireEvent.click(screen.getByText(/Fetch Transactions/i));

    // Check that the loading text is shown while fetching
    expect(screen.getByText(/Loading.../)).toBeInTheDocument();

    // Wait for the data to be displayed
    await waitFor(() => screen.getByText("Alice"));
  });
});
