import { useEffect, useState } from 'react';
import api from '../api';

export default function Alerts({ onViewAll, backToDashboard }) {
  const [alerts, setAlerts] = useState([]);

  // Demo: Always show a filled list for visual impact
  useEffect(() => {
    setAlerts([
      { title: 'Illegal Fishing Detected', description: 'Vessel VSL-4821 in PFZ-1', level: 'Critical' },
      { title: 'Rare Species Sighting', description: 'Chelonia mydas detected', level: 'Info' },
      { title: 'Weather Alert', description: 'High winds expected in PFZ-2', level: 'Warning' },
      { title: 'Unauthorized Entry', description: 'Vessel VSL-3597 in PFZ-2', level: 'Critical' },
      { title: 'Equipment Malfunction', description: 'Buoy 12 offline', level: 'Warning' }
    ]);
    // To use real API, uncomment below:
    // api.get('/api/alerts').then(res => setAlerts(res.data || []));
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">Alerts</div>
        <div className="card-action" style={{ cursor: 'pointer' }} onClick={onViewAll}>View All</div>
      </div>
  {backToDashboard && <div className="card-action" style={{ cursor: 'pointer', color: 'var(--primary)', marginBottom: 16 }} onClick={backToDashboard}>Back to Dashboard</div>}
      <div className="alerts-list">
        {alerts.slice(0, 5).map((a, i) => (
          <div key={a._id || i} className="alert-item">
            <div className="alert-icon alert-critical"><i className="fas fa-exclamation-triangle"></i></div>
            <div className="alert-content">
              <div className="alert-title">{a.title}</div>
              <div className="alert-time">{a.description}</div>
            </div>
            <div className="alert-level">{a.level}</div>
          </div>
        ))}
        {alerts.length === 0 && <div className="alert-empty">No alerts</div>}
      </div>
    </div>
  );
}
