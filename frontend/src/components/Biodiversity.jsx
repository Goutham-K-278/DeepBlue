import { useEffect, useState, useRef } from 'react';
import api from '../api';

export default function Biodiversity({ onSeeAll, backToDashboard }) {
  const [species, setSpecies] = useState([]);

  // Show only 3 common fish, and clicking icon highlights on map
  useEffect(() => {
    setSpecies([
      // All coordinates are in the ocean off South India
      { name: 'Tuna (Thunnus albacares)', lat: 8.6, lng: 78.2 }, // Gulf of Mannar
  { name: 'Mackerel (Scomberomorus commerson)', lat: 9.3, lng: 74.8 }, // Deep Arabian Sea off Kerala
      { name: 'Sardine (Sardinella longiceps)', lat: 12.3, lng: 80.7 } // Bay of Bengal off Chennai
    ]);
  }, []);

  // Keep track of fish markers so we can clear them
  const fishMarkersRef = useRef([]);

  function handleFishClick(fish) {
    if (window._marineMap && fish.lat && fish.lng) {
      window._marineMap.setView([fish.lat, fish.lng], 9);
      // Use FontAwesome fish icon as marker
      const fishIcon = L.divIcon({
        html: '<i class="fas fa-fish" style="color:#1a73e8;font-size:28px;"></i>',
        iconSize: [32, 32],
        className: ''
      });
      const marker = L.marker([fish.lat, fish.lng], {icon: fishIcon})
        .addTo(window._marineMap)
        .bindPopup(`<b>${fish.name}</b><br>Detected here`).openPopup();
      fishMarkersRef.current.push(marker);
    }
  }

  function clearFishMarkers() {
    if (window._marineMap && fishMarkersRef.current.length > 0) {
      fishMarkersRef.current.forEach(m => window._marineMap.removeLayer(m));
      fishMarkersRef.current = [];
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">Biodiversity (eDNA Detected)</div>
        <div className="card-action" style={{ cursor: 'pointer' }} onClick={onSeeAll}>See All</div>
      </div>
      {backToDashboard && <div className="card-action" style={{ cursor: 'pointer', color: 'var(--primary)', marginBottom: 16 }} onClick={backToDashboard}>Back to Dashboard</div>}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
        <button onClick={clearFishMarkers} style={{ background: '#e0e0e0', border: 'none', borderRadius: 6, padding: '6px 16px', cursor: 'pointer', color: '#333' }}>
          Clear Fish Markers
        </button>
      </div>
      <div className="species-grid">
        {species.length === 0 && <div>No species detected at this location.</div>}
        {species.map((fish, i) => (
          <div className="species-item" key={fish.name} onClick={() => handleFishClick(fish)} style={{ cursor: 'pointer' }}>
            <div className="species-icon" style={{ color: '#1a73e8' }}>
              <i className="fas fa-fish"></i>
            </div>
            <div>{fish.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
