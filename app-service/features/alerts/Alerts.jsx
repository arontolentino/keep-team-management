import { useSelector } from 'react-redux';
import { selectAlerts } from './alerts.slice';
import AlertCard from './AlertCard';

const Alerts = () => {
  const alerts = useSelector(selectAlerts);

  return (
    <div
      aria-live="assertive"
      className="z-20 fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6"
    >
      <div className="w-full flex flex-col items-center space-y-4 sm:items-start">
        {alerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  );
};

export default Alerts;
