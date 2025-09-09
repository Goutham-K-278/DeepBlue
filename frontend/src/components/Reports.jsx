import { useEffect, useState } from 'react';
import api from '../api';

export default function Reports({ onDownload, backToDashboard }) {
  const [reports, setReports] = useState([]);

  // Demo: Always show a filled list for visual impact
  useEffect(() => {
    setReports([
      { title: 'Weekly Summary', summary: '4 vessels detected, 2 alerts, 1 rare species.', date: '2025-09-10' },
      { title: 'PFZ Compliance', summary: 'No violations in PFZ-1.', date: '2025-09-09' },
      { title: 'eDNA Analysis', summary: 'Detected 6 species, 1 rare.', date: '2025-09-08' },
      { title: 'Otolith Study', summary: 'Avg age: 7 years.', date: '2025-09-07' },
      { title: 'Weather Report', summary: 'No severe events.', date: '2025-09-06' }
    ]);
    // To use real API, uncomment below:
    // api.get('/api/reports').then(res => setReports(res.data || []));
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">Reports</div>
        <div className="card-action" style={{ cursor: 'pointer' }} onClick={onDownload}>Download</div>
      </div>
  {backToDashboard && <div className="card-action" style={{ cursor: 'pointer', color: 'var(--primary)', marginBottom: 16 }} onClick={backToDashboard}>Back to Dashboard</div>}
      <div className="reports-list">
        {reports.slice(0, 5).map((r, i) => (
          <div key={r._id || i} className="report-item">
            <div className="report-icon"><i className="fas fa-file-alt"></i></div>
            <div className="report-content">
              <div className="report-title">{r.title}</div>
              <div className="report-summary">{r.summary}</div>
            </div>
            <div className="report-date">{r.date}</div>
          </div>
        ))}
        {reports.length === 0 && <div className="report-empty">No reports</div>}
      </div>
    </div>
  );
}
