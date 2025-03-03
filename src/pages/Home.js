import React from "react";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">RED Event Scheduler</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <EventForm />
        <EventList />
      </div>
    </div>
  );
};

export default Home;