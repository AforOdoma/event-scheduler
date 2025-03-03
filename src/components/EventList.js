import React, { useEffect, useState } from "react";
import { getEvents } from "../api";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await getEvents();
        setEvents(response.data || []);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  if (loading) return <div className="text-center p-4">Loading events...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
      
      {events.length === 0 ? (
        <p className="text-gray-500">No events scheduled yet.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {events.map((event) => (
            <li key={event.id} className="py-4">
              <div className="font-medium">{event.name}</div>
              <div className="text-gray-600">{new Date(event.date).toLocaleString()}</div>
              <div className="text-sm text-gray-500">{event.email}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;