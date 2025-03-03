import React from "react";

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Event Monitoring Dashboard</h1>
      <iframe
        src="https://g-2499c6ef78.grafana-workspace.us-east-1.amazonaws.com"
        width="100%"
        height="600px"
        frameBorder="0"
        title="Event Monitoring Dashboard"
      ></iframe>
    </div>
  );
};

export default Dashboard;