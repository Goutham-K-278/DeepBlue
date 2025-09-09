import { useEffect, useState } from 'react';
import api from '../api';

export default function EnvironmentalAnalysis() {
  const [result, setResult] = useState(null);

  // Demo: Always show a filled result for visual impact
  useEffect(() => {
    setResult({
      eDNA: {
        detectedSpecies: ['Thunnus albacares', 'Chelonia mydas', 'Delphinus delphis'],
        rareSpecies: ['Chelonia mydas']
      },
      waterQuality: 'Good',
      temperature: 27.3
    });
    // To use real API, uncomment below:
    // api.get('/api/ml/environmental').then(res => setResult(res.data));
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">Environmental & eDNA Analysis</div>
      </div>
      {result ? (
        <div style={{ padding: 16 }}>
          <div><b>Detected Species:</b> {result.eDNA.detectedSpecies.join(', ')}</div>
          <div><b>Rare Species:</b> {result.eDNA.rareSpecies.join(', ')}</div>
          <div><b>Water Quality:</b> {result.waterQuality}</div>
          <div><b>Temperature:</b> {result.temperature}°C</div>
        </div>
      ) : (
        <div style={{ padding: 16 }}>Loading environmental analysis...</div>
      )}
    </div>
  );
}
