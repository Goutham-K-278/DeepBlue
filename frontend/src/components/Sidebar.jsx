import './Sidebar.css';

export default function Sidebar({ active, setActive }) {
  // Use the correct FontAwesome icon classes for each nav item, matching the HTML reference
  const navSections = [
    {
      title: 'Dashboard',
      items: [
        { icon: 'fa-solid fa-th-large', label: 'Overview' },
        { icon: 'fa-solid fa-ship', label: 'Ship Detection' },
        { icon: 'fa-solid fa-fish', label: 'Biodiversity' },
        { icon: 'fa-solid fa-bell', label: 'Alerts' },
        { icon: 'fa-solid fa-chart-bar', label: 'Reports' },
      ],
    },
    {
      title: 'Dedicated',
      items: [
        { icon: 'fa-solid fa-satellite', label: 'Satellite Monitoring' },
        { icon: 'fa-solid fa-map-marked-alt', label: 'PFZ Management' },
        { icon: 'fa-solid fa-database', label: 'Data Archive' },
      ],
    },
    {
      title: 'Tools',
      items: [
        { icon: 'fa-solid fa-cog', label: 'Settings' },
        { icon: 'fa-solid fa-question-circle', label: 'Help & Support' },
      ],
    },
  ];

  return (
    <div className="sidebar">
      <div className="logo">
        {/* Use the correct logo icon and text, matching the HTML */}
  <h1><i className="fa-solid fa-water" style={{marginRight: 10, fontSize: 28}}></i> <span>DeepBlue</span></h1>
      </div>
      {navSections.map((section) => (
        <div className="nav-section" key={section.title}>
          <h3>{section.title}</h3>
          {section.items.map(item => (
            <div
              className={`nav-item${active === item.label ? ' active' : ''}`}
              key={item.label}
              onClick={() => setActive(item.label)}
            >
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
