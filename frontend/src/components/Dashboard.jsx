
import StatsCards from './StatsCards';
import ShipDetection from './ShipDetection';
import Biodiversity from './Biodiversity';
import Alerts from './Alerts';
import Reports from './Reports';
import Optimization from './Optimization';
import EnvironmentalAnalysis from './EnvironmentalAnalysis';
import CatchMorphometrics from './CatchMorphometrics';
import { useEffect } from 'react';
import L from 'leaflet';

export default function Dashboard({
  onViewFullMap,
  onSeeAllBiodiversity,
  onViewAllAlerts,
  onDownloadReports,
  onExportData,
  onViewHistory
}) {
  useEffect(() => {
    if (!L || !document.getElementById('marineMap')) return;
    // Prevent double init
    if (window._marineMap) return;
    const map = L.map('marineMap').setView([12.0, 45.0], 6);
    window._marineMap = map;
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    // Demo vessel markers
    const vessels = [
      {lat: 12.34, lng: 45.67, id: 'VSL-4821'},
      {lat: 13.78, lng: 46.24, id: 'VSL-3597'},
      {lat: 12.91, lng: 45.12, id: 'VSL-6842'},
      {lat: 13.45, lng: 46.88, id: 'VSL-1573'}
    ];
    vessels.forEach(v => {
      L.marker([v.lat, v.lng]).addTo(map).bindPopup(`<b>${v.id}</b><br>Detected vessel`);
    });
    // Improved PFZ polygons (all at sea, not on land)
    const pfzCoordinates = [
      [[12.0, 46.0], [12.0, 47.0], [13.0, 47.0], [13.0, 46.0]], // offshore
      [[13.2, 46.5], [13.2, 47.2], [14.0, 47.2], [14.0, 46.5]], // offshore
      [[12.5, 45.2], [12.5, 45.8], [13.1, 45.8], [13.1, 45.2]]  // offshore
    ];
    pfzCoordinates.forEach((coords, i) => {
      L.polygon(coords, {color: 'blue', fillOpacity: 0.15}).addTo(map).bindPopup(`<b>PFZ-${i+1}</b><br>Protected Fishing Zone`);
    });
    // Cleanup on unmount
    return () => {
      if (window._marineMap) {
        window._marineMap.remove();
        window._marineMap = null;
      }
    };
  }, []);
  return (
    <>
      <div className="header">
        <h2>Marine Monitoring Dashboard</h2>
        <div className="user-info">
          <img src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff" alt="User" />
          <div>
            <div>Admin User</div>
            <div style={{ fontSize: 12, color: 'var(--gray)' }}>Marine Biologist</div>
          </div>
        </div>
      </div>
      <StatsCards />
      <div className="dashboard-grid">
        {/* Left Column */}
        <div>
          {/* Map Section */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Marine Activity Map</div>
              <div className="card-action" style={{ cursor: 'pointer' }} onClick={onViewFullMap}>View Full Map</div>
            </div>
            <div className="map-container">
              <div id="marineMap" style={{ width: '100%', height: '300px' }}></div>
            </div>
          </div>
          {/* Ship Detection Section */}
          <ShipDetection onExportData={onExportData} onViewHistory={onViewHistory} />
        </div>
        {/* Right Column: Biodiversity, Alerts, Reports, ML Modules */}
        <div>
          <Biodiversity onSeeAll={onSeeAllBiodiversity} />
          <Alerts onViewAll={onViewAllAlerts} />
          <Reports onDownload={onDownloadReports} />
          <Optimization />
          <EnvironmentalAnalysis />
          <CatchMorphometrics />
        </div>
      </div>
    </>
  );
}
