import React, { useState } from "react";
import { createEvent } from "../api";

const EventForm = () => {
  const [eventData, setEventData] = useState({ name: "", date: "", email: "" });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEvent(eventData);
      alert("Event created successfully!");
    } catch (error) {
      console.error("Error creating event", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Event Name" onChange={handleChange} required />
      <input type="datetime-local" name="date" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Your Email" onChange={handleChange} required />
      <button type="submit">Create Event</button>
    </form>
  );
};

export default EventForm;
