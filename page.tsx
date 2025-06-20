'use client';

import { useEffect, useState } from 'react';

type Record = {
  publisher_id: string;
  ad_slot_id: string;
  geo: string;
  device: string;
  time: string;
  winner_dsp: string;
  bid_price: number;
};

export default function DashboardPage() {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/ad-request-history')
      .then(res => res.json())
      .then(data => setRecords(data))
      .catch(err => {
        console.error(err);
        setRecords([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">Loading…</p>;
  if (records.length === 0) return <p className="p-4">No records yet.</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Ad Auction Dashboard</h1>
      <p>Total Requests: {records.length}</p>
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Geo</th>
            <th className="px-4 py-2">Device</th>
            <th className="px-4 py-2">Winner DSP</th>
            <th className="px-4 py-2">Bid Price</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, i) => (
            <tr key={i} className="border-t">
              <td className="px-4 py-2">{new Date(r.time).toLocaleString()}</td>
              <td className="px-4 py-2">{r.geo}</td>
              <td className="px-4 py-2">{r.device}</td>
              <td className="px-4 py-2">{r.winner_dsp}</td>
              <td className="px-4 py-2">${r.bid_price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}