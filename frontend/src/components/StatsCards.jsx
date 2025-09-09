import { useEffect, useState } from 'react';
import api from '../api';

const cardConfig = [
  {
    key: 'vessel',
    title: 'Vessel Count',
    icon: 'fa-ship',
    className: 'vessel',
    api: '/api/vessels/stats',
    valueKey: 'count',
    changeKey: 'active',
    changeLabel: 'active today',
  },
  {
    key: 'pfz',
    title: 'PFZ Count',
    icon: 'fa-map-marker-alt',
    className: 'pfz',
    api: '/api/pfz/stats',
    valueKey: 'count',
    changeKey: 'open',
    changeLabel: 'available sites',
  },
  {
    key: 'alerts',
    title: 'Alerts',
    icon: 'fa-bell',
    className: 'alerts',
    api: '/api/alerts/stats',
    valueKey: 'count',
    changeKey: 'critical',
    changeLabel: 'critical',
  },
  {
    key: 'biodiversity',
    title: 'Species Identified',
    icon: 'fa-fish',
    className: 'biodiversity',
    api: '/api/species/stats',
    valueKey: 'count',
    changeKey: 'endangered',
    changeLabel: 'endangered',
  },
];

export default function StatsCards() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    async function fetchStats() {
      const newStats = {};
      for (const card of cardConfig) {
        try {
          const res = await api.get(card.api);
          newStats[card.key] = res.data;
        } catch {
          // Fallback demo values
          if (card.key === 'vessel') newStats[card.key] = { count: 24, active: 17 };
          else if (card.key === 'pfz') newStats[card.key] = { count: 3, open: 2 };
          else if (card.key === 'alerts') newStats[card.key] = { count: 2, critical: 1 };
          else if (card.key === 'biodiversity') newStats[card.key] = { count: 38, endangered: 4 };
          else newStats[card.key] = {};
        }
      }
      setStats(newStats);
    }
    fetchStats();
  }, []);

  return (
    <div className="stats-container">
      {cardConfig.map(card => (
        <div className={`stat-card ${card.className}`} key={card.key}>
          <div className="stat-header">
            <div className="stat-title">{card.title}</div>
            <div className="stat-icon">
              <i className={`fas ${card.icon}`}></i>
            </div>
          </div>
          <div className="stat-value">{stats[card.key]?.[card.valueKey] ?? '--'}</div>
          <div className="stat-change">
            <span className={card.key === 'alerts' ? 'negative' : 'positive'}>
              {stats[card.key]?.[card.changeKey] !== undefined ? `+${stats[card.key][card.changeKey]} ` : ''}
            </span>
            · {card.changeLabel}
          </div>
        </div>
      ))}
    </div>
  );
}
