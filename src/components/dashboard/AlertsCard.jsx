import React from 'react';
import SectionCard from '../ui/SectionCard';
import { alerts } from '@/data/dashboardSample';
const AlertsCard = () => {
    return (
        <SectionCard title="Alerts">
      <ul className="space-y-2 text-sm text-red-600">
        {alerts.map((alert, i) => (
          <li key={i}>⚠ {alert}</li>
        ))}
      </ul>
    </SectionCard>
    );
};

export default AlertsCard;