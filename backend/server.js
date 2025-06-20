// backend/server.js

const express = require('express');
const cors = require('cors');
const { getEligibleBids, runAuction } = require('./auction');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory storage for past ad-requests
const history = [];

app.post('/ad-request', (req, res) => {
  const adRequest = req.body;

  // Run the auction
  const eligibleBids = getEligibleBids(adRequest);
  const winner = runAuction(eligibleBids);

  // Build a record combining request + result
  const record = {
    publisher_id: adRequest.publisher_id,
    ad_slot_id: adRequest.ad_slot_id,
    geo: adRequest.geo,
    device: adRequest.device,
    time: adRequest.time,
    ...winner
  };

  // Save to history
  history.push(record);

  // Respond with only the winner info
  res.json(winner);
});

// Expose the full history
app.get('/ad-request-history', (req, res) => {
  res.json(history);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`SSP backend running on http://localhost:${PORT}`);
});