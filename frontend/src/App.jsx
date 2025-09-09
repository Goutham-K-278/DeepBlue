import './App.css';
import './dashboard.css';
import 'leaflet/dist/leaflet.css';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ShipDetection from './components/ShipDetection';
import Biodiversity from './components/Biodiversity';
import Alerts from './components/Alerts';
import Reports from './components/Reports';
import DataArchive from './components/DataArchive';
import { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { email, password });
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        onLogin(res.data.user);
      } else {
        setError('Invalid response');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: '#1a2330'
    }}>
      {/* Animated clouds at the top */}
  <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '180px', zIndex: 0 }} viewBox="0 0 1440 180" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"> 
        <g style={{ animation: 'cloudMove 32s linear infinite' }}>
          <ellipse cx="200" cy="70" rx="90" ry="32" fill="#e3e8f7" fillOpacity="0.85">
            <animate attributeName="cx" values="200;1240;200" dur="32s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="600" cy="50" rx="70" ry="24" fill="#cfd8ee" fillOpacity="0.7">
            <animate attributeName="cx" values="600;100;600" dur="28s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="1100" cy="90" rx="100" ry="36" fill="#e3e8f7" fillOpacity="0.8">
            <animate attributeName="cx" values="1100;300;1100" dur="36s" repeatCount="indefinite" />
          </ellipse>
        </g>
      </svg>
      {/* Wavy animated SVG background at the bottom */}
  <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }} viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"> 
        <defs>
          <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0b3a6e" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#0b5394" stopOpacity="0.22" />
          </linearGradient>
          <linearGradient id="waveGradient2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a73e8" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#0b5394" stopOpacity="0.13" />
          </linearGradient>
        </defs>
        <g style={{ animation: 'waveMove 12s linear infinite' }}>
          <path d="M0,600 Q360,700 720,600 T1440,600 V800 H0 Z" fill="url(#waveGradient)" >
            <animate attributeName="d" dur="12s" repeatCount="indefinite"
              values="M0,600 Q360,700 720,600 T1440,600 V800 H0 Z;
                      M0,620 Q360,580 720,640 T1440,620 V800 H0 Z;
                      M0,600 Q360,700 720,600 T1440,600 V800 H0 Z" />
          </path>
        </g>
        <g style={{ animation: 'waveMove2 18s linear infinite' }}>
          <path d="M0,700 Q480,800 960,700 T1440,700 V800 H0 Z" fill="url(#waveGradient2)" >
            <animate attributeName="d" dur="18s" repeatCount="indefinite"
              values="M0,700 Q480,800 960,700 T1440,700 V800 H0 Z;
                      M0,720 Q480,680 960,740 T1440,720 V800 H0 Z;
                      M0,700 Q480,800 960,700 T1440,700 V800 H0 Z" />
          </path>
        </g>
      </svg>
  <div className="card" style={{ maxWidth: 500, width: '100%', minHeight: 360, boxShadow: '0 8px 32px rgba(30,40,80,0.18)', zIndex: 1, background: '#fff', color: '#222' }}>
        <div className="card-header">
          <div className="card-title">Admin Login</div>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ padding: 10, borderRadius: 6, border: '1px solid #dadce0' }} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ padding: 10, borderRadius: 6, border: '1px solid #dadce0' }} />
          <button type="submit" style={{ padding: 12, borderRadius: 6, background: 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer' }}>Login</button>
          {error && <div style={{ color: 'var(--danger)', marginTop: 8 }}>{error}</div>}
        </form>
      </div>
    </div>
  );
}

// Placeholder pages for Dedicated and Tools, all with Back to Dashboard
function BackToDashboard({ onBack }) {
  return <div className="card-action" style={{ cursor: 'pointer', color: 'var(--primary)', marginBottom: 16 }} onClick={onBack}>Back to Dashboard</div>;
}
function SatelliteMonitoring({ onBack }) {
  // Map with overlays for cloud cover, SAR anomaly, and detected vessels
  const mapRef = useRef(null);
  // Analytics values match overlays below
  const vesselCount = 4;
  const sarCount = 3;
  const cloudCount = 1;
  useEffect(() => {
    if (!mapRef.current) return;
    if (window._satMap) {
      window._satMap.remove();
      window._satMap = null;
    }
    const map = L.map(mapRef.current, { zoomControl: false }).setView([10.5, 78.0], 6);
    window._satMap = map;
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    // Cloud cover (blue polygon, 1 area)
    L.polygon([
      [9.0, 77.0], [9.0, 79.0], [10.5, 79.0], [10.5, 77.0]
    ], { color: '#2196f3', fillColor: '#2196f3', fillOpacity: 0.25, weight: 1 }).addTo(map).bindPopup('Cloud Cover Area');
    // SAR anomaly regions (3 red polygons)
    [
      [[8.7, 78.2], [8.7, 78.7], [9.1, 78.7], [9.1, 78.2]],
      [[10.2, 76.0], [10.2, 76.5], [10.7, 76.5], [10.7, 76.0]],
      [[12.0, 80.8], [12.0, 81.2], [12.4, 81.2], [12.4, 80.8]]
    ].forEach(coords => {
      L.polygon(coords, { color: '#e53935', fillColor: '#e53935', fillOpacity: 0.22, weight: 2 }).addTo(map).bindPopup('SAR Anomaly');
    });
    // Detected vessels (4 yellow markers)
    [
      {lat: 8.3, lng: 78.7, id: 'VSL-4821'},
      {lat: 9.3, lng: 74.8, id: 'VSL-3597'},
      {lat: 12.0, lng: 81.3, id: 'VSL-6842'},
      {lat: 8.5, lng: 79.2, id: 'VSL-1573'}
    ].forEach(v => {
      const icon = L.divIcon({
        html: '<i class="fas fa-ship" style="color:#fbc02d;font-size:24px;"></i>',
        iconSize: [28, 28],
        className: ''
      });
      L.marker([v.lat, v.lng], {icon}).addTo(map).bindPopup(`<b>${v.id}</b><br>Detected vessel`);
    });
    return () => {
      map.remove();
      window._satMap = null;
    };
  }, []);
  return (
    <div className="card">
      <div className="card-header"><div className="card-title">Satellite Monitoring</div></div>
      <BackToDashboard onBack={onBack} />
      <div style={{ marginBottom: 16 }}>
        <b>Latest Satellite Images:</b>
        <ul>
          <li><a href="https://eoimages.gsfc.nasa.gov/images/imagerecords/146000/146593/indianocean_tmo_2021096_lrg.jpg" target="_blank" rel="noopener noreferrer">Indian Ocean - 2025-09-10</a></li>
          <li><a href="https://eoimages.gsfc.nasa.gov/images/imagerecords/146000/146593/indianocean_tmo_2021095_lrg.jpg" target="_blank" rel="noopener noreferrer">Indian Ocean - 2025-09-09</a></li>
        </ul>
      </div>
      <div style={{ marginBottom: 16 }}>
        <b>Satellite Analytics (Demo):</b>
        <ul>
          <li>Detected vessels (last 24h): <b>{vesselCount}</b></li>
          <li>SAR anomaly regions: <b>{sarCount}</b></li>
          <li>Cloud cover: <b>{cloudCount}</b></li>
        </ul>
      </div>
      <div style={{ marginBottom: 16 }}>
        <b>Interactive Map:</b>
        <div style={{ height: 240, width: '100%', border: '1px solid #e0e0e0', borderRadius: 8, marginTop: 8, marginBottom: 8 }}>
          <div ref={mapRef} style={{ height: '100%', width: '100%', borderRadius: 8 }} id="satMap"></div>
        </div>
        <div style={{ fontSize: 13, color: '#888' }}>Map: Cloud cover (blue), SAR anomaly (red), vessels (yellow)</div>
      </div>
      <div>
        <b>Detection Tools:</b>
        <ul>
          <li>Upload satellite image for vessel detection (see Ship Detection tab)</li>
          <li>View SAR heatmaps and anomaly overlays (coming soon)</li>
        </ul>
      </div>
    </div>
  );
}
// ...existing code...

function PFZManagement({ onBack }) {
  const [selectedZone, setSelectedZone] = useState(null);
  const mapRef = useRef(null);
  // PFZ polygons: [ [ [lat, lng], ... ], ... ]
    const pfzPolygons = [
      [[8.5, 77.5], [8.5, 78.5], [9.5, 78.5], [9.5, 77.5]], // PFZ-1 (Gulf of Mannar)
      [[10.0, 75.5], [10.0, 76.5], [11.0, 76.5], [11.0, 75.5]], // PFZ-2 (off Kerala)
      [[12.0, 80.0], [12.0, 81.0], [13.0, 81.0], [13.0, 80.0]], // PFZ-3 (off Chennai)
  ];
  useEffect(() => {
    if (!mapRef.current) return;
    if (window._pfzMap) {
      window._pfzMap.remove();
      window._pfzMap = null;
    }
  const map = L.map(mapRef.current, { zoomControl: false }).setView([10.5, 78.0], 6);
    window._pfzMap = map;
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    // Draw all PFZ polygons
    pfzPolygons.forEach((coords, i) => {
      L.polygon(coords, {
        color: selectedZone === i ? (i === 0 ? '#1a73e8' : i === 1 ? '#e67e22' : '#e74c3c') : '#888',
        fillOpacity: selectedZone === i ? 0.3 : 0.08,
        weight: selectedZone === i ? 4 : 2,
      }).addTo(map).bindPopup(`<b>PFZ-${i+1}</b>`);
    });
    // Zoom to selected zone
    if (selectedZone !== null) {
      const bounds = L.latLngBounds(pfzPolygons[selectedZone]);
      map.fitBounds(bounds.pad(0.2));
    }
    return () => {
      map.remove();
      window._pfzMap = null;
    };
  }, [selectedZone]);

  return (
    <div className="card">
      <div className="card-header"><div className="card-title">PFZ Management</div></div>
      <BackToDashboard onBack={onBack} />
      <div style={{ marginBottom: 16 }}>
        <b>Protected Fishing Zones (PFZ):</b>
        <ul>
          <li><b><a href="#pfz1" style={{ color: '#1a73e8', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setSelectedZone(0)}>PFZ-1:</a></b> 12.0°N, 46.0°E to 13.0°N, 47.0°E <span style={{ color: '#1a73e8' }}>(Active)</span></li>
          <li><b><a href="#pfz2" style={{ color: '#e67e22', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setSelectedZone(1)}>PFZ-2:</a></b> 13.2°N, 46.5°E to 14.0°N, 47.2°E <span style={{ color: '#e67e22' }}>(Seasonal)</span></li>
          <li><b><a href="#pfz3" style={{ color: '#e74c3c', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setSelectedZone(2)}>PFZ-3:</a></b> 12.5°N, 45.2°E to 13.1°N, 45.8°E <span style={{ color: '#e74c3c' }}>(Restricted)</span></li>
        </ul>
      </div>
      <div style={{ marginBottom: 16 }}>
        <b>PFZ Map (Interactive):</b>
        <div style={{ height: 240, width: '100%', border: '1px solid #e0e0e0', borderRadius: 8, marginTop: 8, marginBottom: 8 }}>
          <div ref={mapRef} style={{ height: '100%', width: '100%', borderRadius: 8 }} id="pfzMap"></div>
        </div>
        <div style={{ fontSize: 13, color: '#888' }}>Click a PFZ above to highlight and zoom to it on the map.</div>
      </div>
      <div>
        <b>Management Actions:</b>
        <ul>
          <li>Monitor vessel entry/exit in real time (demo)</li>
          <li>Issue alerts for unauthorized activity (demo)</li>
          <li>Download PFZ advisories from Data Archive</li>
        </ul>
      </div>
    </div>
  );
}
function Settings({ onBack }) {
  return <div className="card"><div className="card-header"><div className="card-title">Settings</div></div><BackToDashboard onBack={onBack} /><div>Settings page coming soon.</div></div>;
}
function HelpSupport({ onBack }) {
  return <div className="card"><div className="card-header"><div className="card-title">Help &amp; Support</div></div><BackToDashboard onBack={onBack} /><div>Help and support resources coming soon.</div></div>;
}

import { useEffect, useRef } from 'react';
import L from 'leaflet';
function FullMap({ onBack }) {
  const mapRef = useRef(null);
  useEffect(() => {
    if (!mapRef.current) return;
    // Remove any previous map instance
    if (window._fullMap) {
      window._fullMap.remove();
      window._fullMap = null;
    }
  // Center on South India ocean
  const map = L.map(mapRef.current).setView([10.5, 78.0], 6);
    window._fullMap = map;
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    // Demo vessel markers (South India ocean region)
    const vessels = [
      {lat: 8.3, lng: 78.7, id: 'VSL-4821'}, // Well off Gulf of Mannar, ocean
      {lat: 9.3, lng: 74.8, id: 'VSL-3597'}, // Further west, deep Arabian Sea
      {lat: 12.0, lng: 81.3, id: 'VSL-6842'}, // Well off Chennai, Bay of Bengal
      {lat: 8.5, lng: 79.2, id: 'VSL-1573'}   // Deep ocean, south of Tamil Nadu
    ];
    vessels.forEach(v => {
      L.marker([v.lat, v.lng]).addTo(map).bindPopup(`<b>${v.id}</b><br>Detected vessel`);
    });
    // PFZ polygons (same as PFZManagement)
    const pfzCoordinates = [
      [[8.2, 78.6], [8.2, 79.0], [8.8, 79.0], [8.8, 78.6]], // Well off Gulf of Mannar, ocean
      [[9.7, 75.2], [9.7, 75.7], [10.3, 75.7], [10.3, 75.2]], // Well off Kerala, Arabian Sea
      [[11.8, 81.2], [11.8, 81.6], [12.4, 81.6], [12.4, 81.2]], // Well off Chennai, Bay of Bengal
    ];
    pfzCoordinates.forEach((coords, i) => {
      L.polygon(coords, {color: ['#1a73e8','#e67e22','#e74c3c'][i], fillOpacity: 0.15}).addTo(map).bindPopup(`<b>PFZ-${i+1}</b><br>Protected Fishing Zone`);
    });
    return () => {
      map.remove();
      window._fullMap = null;
    };
  }, []);
  return (
    <div className="card" style={{ width: '100%', maxWidth: 'none' }}>
      <div className="card-header">
        <div className="card-title">Marine Activity Map - Full View</div>
        <div className="card-action" style={{ cursor: 'pointer' }} onClick={onBack}>Back to Dashboard</div>
      </div>
      <div className="map-container" style={{ height: '70vh', width: '100%' }}>
        <div ref={mapRef} style={{ height: '100%', width: '100%' }} id="fullMap"></div>
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState('Overview');
  const [showFullMap, setShowFullMap] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [user, setUser] = useState(null);

  // Handlers for blue links
  const handleViewFullMap = () => setShowFullMap(true);
  const handleSeeAllBiodiversity = () => setActive('Biodiversity');
  const handleViewAllAlerts = () => setActive('Alerts');
  const handleDownloadReports = () => setShowDownload(true);
  const handleExportData = () => setShowExport(true);
  const handleViewHistory = () => setActive('Ship Detection');
  const handleBackToDashboard = () => {
    setActive('Overview');
    setShowFullMap(false);
    setShowExport(false);
    setShowDownload(false);
  };
  const handleLogin = (userObj) => setUser(userObj);
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  // Download mock CSV/JSON for Export Data and Download
  function downloadFile(filename, content, type = 'text/csv') {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  if (showExport) {
    return (
      <div className="card">
        <div className="card-header">
          <div className="card-title">Export Data</div>
          <div className="card-action" style={{ cursor: 'pointer' }} onClick={handleBackToDashboard}>Back to Dashboard</div>
        </div>
  <div style={{ marginBottom: 16 }}>Click below to download recent detections as CSV.</div>
        <button onClick={() => downloadFile('detections.csv', 'Ship ID,Confidence,Location,Status\nVSL-4821,98%,12.34°N 45.67°E,Active\nVSL-3597,92%,13.78°N 46.24°E,Active\nVSL-6842,87%,12.91°N 45.12°E,Anchored\nVSL-1573,96%,13.45°N 46.88°E,Active')}>Download CSV</button>
      </div>
    );
  }
  if (showDownload) {
    return (
      <div className="card">
        <div className="card-header">
          <div className="card-title">Download Reports</div>
          <div className="card-action" style={{ cursor: 'pointer' }} onClick={handleBackToDashboard}>Back to Dashboard</div>
        </div>
  <div style={{ marginBottom: 16 }}>Click below to download weekly report as JSON.</div>
        <button onClick={() => downloadFile('weekly-report.json', JSON.stringify({ report: 'Weekly report', vessels: 12, pfz: 5, alerts: 3, species: 42 }, null, 2), 'application/json')}>Download JSON</button>
      </div>
    );
  }

  let MainContent;
  if (showFullMap) {
    MainContent = <FullMap onBack={handleBackToDashboard} />;
  } else {
    switch (active) {
      case 'Overview':
        MainContent = <Dashboard
          onViewFullMap={handleViewFullMap}
          onSeeAllBiodiversity={handleSeeAllBiodiversity}
          onViewAllAlerts={handleViewAllAlerts}
          onDownloadReports={handleDownloadReports}
          onExportData={handleExportData}
          onViewHistory={handleViewHistory}
        />;
        break;
      case 'Ship Detection':
        MainContent = <ShipDetection onExportData={handleExportData} onViewHistory={handleViewHistory} backToDashboard={handleBackToDashboard} />;
        break;
      case 'Biodiversity':
        MainContent = <Biodiversity onSeeAll={handleSeeAllBiodiversity} backToDashboard={handleBackToDashboard} />;
        break;
      case 'Alerts':
        MainContent = <Alerts onViewAll={handleViewAllAlerts} backToDashboard={handleBackToDashboard} />;
        break;
      case 'Reports':
        MainContent = <Reports onDownload={handleDownloadReports} backToDashboard={handleBackToDashboard} />;
        break;
      case 'Satellite Monitoring':
        MainContent = <SatelliteMonitoring onBack={handleBackToDashboard} />;
        break;
      case 'PFZ Management':
        MainContent = <PFZManagement onBack={handleBackToDashboard} />;
        break;
      case 'Data Archive':
        MainContent = <DataArchive backToDashboard={handleBackToDashboard} />;
        break;
      case 'Settings':
        MainContent = <Settings onBack={handleBackToDashboard} />;
        break;
      case 'Help & Support':
        MainContent = <HelpSupport onBack={handleBackToDashboard} />;
        break;
      default:
        MainContent = <Dashboard onViewFullMap={handleViewFullMap} />;
    }
  }

  return (
    <div className="app-root">
      <Sidebar active={active} setActive={setActive} />
      <div className="main-content">
  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
          <button onClick={handleLogout} style={{ padding: '6px 16px', borderRadius: 6, background: 'var(--danger)', color: 'white', border: 'none', cursor: 'pointer' }}>Logout</button>
        </div>
        {MainContent}
      </div>
    </div>
  );
}