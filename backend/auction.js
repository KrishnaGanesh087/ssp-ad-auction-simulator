const dsps = require('./dsp');

function getEligibleBids(adRequest) {
  const { geo, device } = adRequest;

  return dsps.filter(dsp => dsp.geo === geo && dsp.device === device);
}

function runAuction(bids) {
  if (bids.length === 0) {
    return { message: "No eligible DSPs found." };
  }

  let winner = bids[0];

  for (const bid of bids) {
    if (bid.bid > winner.bid) {
      winner = bid;
    }
  }

  return {
    winner_dsp: winner.id,
    bid_price: winner.bid,
    creative: winner.creative
  };
}

module.exports = { getEligibleBids, runAuction };