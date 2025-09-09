import { useEffect, useState } from 'react';
import api from '../api';

export default function CatchMorphometrics() {
  const [result, setResult] = useState(null);

  // Demo: Always show a filled result for visual impact
  useEffect(() => {
    setResult({
      species: 'Thunnus albacares',
      avg_length: 1200,
      avg_weight: 35000,
      shape_factor: 0.91,
      age_estimate: 7
    });
    // To use real API, uncomment below:
    // api.get('/api/ml/otolith?species=Thunnus').then(res => setResult(res.data));
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">Catch Morphometrics Analysis</div>
      </div>
      {result ? (
        <div style={{ padding: 16 }}>
          <div><b>Species:</b> {result.species}</div>
          <div><b>Avg Length:</b> {result.avg_length} mm</div>
          <div><b>Avg Weight:</b> {result.avg_weight} g</div>
          <div><b>Shape Factor:</b> {result.shape_factor}</div>
          <div><b>Age Estimate:</b> {result.age_estimate} years</div>
        </div>
      ) : (
        <div style={{ padding: 16 }}>Loading catch morphometrics...</div>
      )}
    </div>
  );
}
