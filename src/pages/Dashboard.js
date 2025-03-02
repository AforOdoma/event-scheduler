import React from "react";

const Dashboard = () => {
  return (
    <div>
      <h1>Event Monitoring Dashboard</h1>
      <iframe
        src="https://your-grafana-dashboard-url"
        width="100%"
        height="600px"
        frameBorder="0"
        title="Event Monitoring Dashboard"
      ></iframe>
    </div>
  );
};

export default Dashboard;
