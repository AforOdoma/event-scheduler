import React from "react";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";

const Home = () => {
  return (
    <div>
      <h1>Event Scheduler</h1>
      <EventForm />
      <EventList />
    </div>
  );
};

export default Home;
