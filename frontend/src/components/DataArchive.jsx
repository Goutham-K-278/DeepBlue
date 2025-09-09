import React, { useState } from 'react';


const demoFiles = [
  { name: 'satellite_imagery_sar.csv', type: 'Satellite SAR', size: '1.2MB', date: '2025-09-10' },
  { name: 'ais_feeds.csv', type: 'AIS Feed', size: '800KB', date: '2025-09-10' },
  { name: 'cmlre_biological_edna.csv', type: 'eDNA', size: '600KB', date: '2025-09-09' },
  { name: 'otolith_taxonomy.csv', type: 'Otolith', size: '400KB', date: '2025-09-08' },
  { name: 'pfz_advisories.csv', type: 'PFZ Advisory', size: '300KB', date: '2025-09-07' },
  { name: 'field_survey_data.csv', type: 'Field Survey', size: '500KB', date: '2025-09-06' },
];

export default function DataArchive({ backToDashboard }) {
  const [filter, setFilter] = useState('');
  const filtered = demoFiles.filter(f => f.name.toLowerCase().includes(filter.toLowerCase()) || f.type.toLowerCase().includes(filter.toLowerCase()));
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">Data Archive</div>
      </div>
      {backToDashboard && <div className="card-action" style={{ cursor: 'pointer', color: 'var(--primary)', marginBottom: 16 }} onClick={backToDashboard}>Back to Dashboard</div>}
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Search files..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          style={{ padding: 8, borderRadius: 6, border: '1px solid #dadce0', width: '100%' }}
        />
      </div>
      <div className="archive-list">
        {filtered.length === 0 && <div>No files found.</div>}
        {filtered.map((f, i) => (
          <div key={f.name} className="archive-item" style={{ display: 'flex', alignItems: 'center', marginBottom: 12, padding: 8, border: '1px solid #e0e0e0', borderRadius: 6 }}>
            <i className="fas fa-file-alt" style={{ fontSize: 20, marginRight: 12, color: '#1a73e8' }}></i>
            <div style={{ flex: 1 }}>
              <div><b>{f.name}</b> <span style={{ color: '#888', fontSize: 12 }}>({f.type})</span></div>
              <div style={{ fontSize: 12, color: '#888' }}>Size: {f.size} | Uploaded: {f.date}</div>
            </div>
            <button
              style={{ padding: '6px 14px', borderRadius: 6, background: 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer' }}
              onClick={() => downloadDemoFile(f)}
            >Download</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Download demo file as CSV
function downloadDemoFile(file) {
  let content = '';
  if (file.type === 'Satellite SAR') content = 'lat,lng,intensity\n12.34,45.67,0.98\n13.78,46.24,0.92';
  else if (file.type === 'AIS Feed') content = 'vessel_id,lat,lng,speed\nVSL-4821,12.34,45.67,12\nVSL-3597,13.78,46.24,10';
  else if (file.type === 'eDNA') content = 'species,lat,lng\nThunnus albacares,12.5,46.2\nSardinella longiceps,12.8,45.9';
  else if (file.type === 'Otolith') content = 'species,avg_length,avg_weight\nThunnus albacares,1200,35000';
  else if (file.type === 'PFZ Advisory') content = 'zone,lat1,lng1,lat2,lng2\nPFZ-1,12.0,46.0,13.0,47.0';
  else if (file.type === 'Field Survey') content = 'site,lat,lng,observation\nSite-1,12.6,46.1,Healthy';
  else content = 'demo,data\n1,2';
  const blob = new Blob([content], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = file.name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
