// src/App.js

import React from 'react';
import './App.css';  
import RewardsCalculator from './components/RewardsCalculator'; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Rewards Program</h1>
      </header>
      <main>
        {/* Rendering the RewardsCalculator component */}
        <RewardsCalculator />
      </main>
    </div>
  );
}

export default App;
