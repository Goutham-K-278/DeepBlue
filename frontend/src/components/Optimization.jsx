import { useEffect, useState } from 'react';
import api from '../api';

export default function Optimization() {
  const [result, setResult] = useState(null);

  // Demo: Always show a filled result for visual impact
  useEffect(() => {
    setResult({
      bestRoute: ['Port', 'PFZ-1', 'PFZ-2', 'Port'],
      fuelSaved: 120,
      timeSaved: 3.5
    });
    // To use real API, uncomment below:
    // api.get('/api/ml/optimization').then(res => setResult(res.data));
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">Optimization Engine</div>
      </div>
      {result ? (
        <div style={{ padding: 16 }}>
          <div><b>Best Route:</b> {result.bestRoute.join(' → ')}</div>
          <div><b>Fuel Saved:</b> {result.fuelSaved} L</div>
          <div><b>Time Saved:</b> {result.timeSaved} hrs</div>
        </div>
      ) : (
        <div style={{ padding: 16 }}>Loading optimization results...</div>
      )}
    </div>
  );
}
