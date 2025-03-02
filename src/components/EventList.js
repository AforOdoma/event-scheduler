import React, { useEffect, useState } from "react";
import { getEvents } from "../api";

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      const response = await getEvents();
      setEvents(response.data);
    }
    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Upcoming Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.name} - {new Date(event.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
