import React, { useState } from "react";

const EventForm = () => {
  const [eventData, setEventData] = useState({ name: "", date: "", email: "" });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:5000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        setEventData({ name: "", date: "", email: "" }); // Clear form
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Event Name" value={eventData.name} onChange={handleChange} required />
      <input type="datetime-local" name="date" value={eventData.date} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Your Email" value={eventData.email} onChange={handleChange} required />
      <button type="submit">Create Event</button>
    </form>
  );
};

export default EventForm;
