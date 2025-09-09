import { useState, useRef } from 'react';
import api from '../api';

export default function ShipDetection({ onExportData, onViewHistory, backToDashboard }) {
  // Demo: Always show a filled list for visual impact
  const [vessels, setVessels] = useState([
    { lat: 12.34, lng: 45.67, confidence: 0.98, id: 'VSL-4821' },
    { lat: 13.78, lng: 46.24, confidence: 0.92, id: 'VSL-3597' },
    { lat: 12.91, lng: 45.12, confidence: 0.87, id: 'VSL-6842' },
    { lat: 13.45, lng: 46.88, confidence: 0.96, id: 'VSL-1573' }
  ]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await api.post('/api/ml/ship-detection', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setVessels(res.data.vessels || []);
    } catch (err) {
      setVessels([]);
    }
    setLoading(false);
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">Ship Detection</div>
        <div className="card-action" style={{ cursor: 'pointer' }} onClick={onViewHistory}>View History</div>
      </div>
      {backToDashboard && (
        <div className="card-action" style={{ cursor: 'pointer', color: 'var(--primary)', marginBottom: 16 }} onClick={backToDashboard}>Back to Dashboard</div>
      )}
      <div className="upload-area" onClick={handleUploadClick} style={{ position: 'relative' }}>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <button type="button" onClick={handleUploadClick} style={{ marginBottom: 12 }}>Upload Satellite Image</button>
        {selectedFile && <div style={{ marginTop: 8, color: 'var(--primary)' }}>Selected: {selectedFile.name}</div>}
      </div>
      {loading && <div>Detecting vessels...</div>}
      <div style={{ marginTop: 16 }}>
        {vessels.length === 0 && !loading && <div>No vessels detected yet.</div>}
        {vessels.map((v, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <b>Lat:</b> {v.lat}, <b>Lng:</b> {v.lng}, <b>Confidence:</b> {v.confidence}
          </div>
        ))}
      </div>
    </div>
  );
}
