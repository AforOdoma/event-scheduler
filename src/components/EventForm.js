import React, { useState } from "react";

const EventForm = () => {
  const [eventData, setEventData] = useState({ name: "", date: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch("http://event-service-alb-69402557.us-east-1.elb.amazonaws.com/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create event");
      }

      const result = await response.json();
      alert(result.message);
      setEventData({ name: "", date: "", email: "" }); // Clear form
    } catch (error) {
      console.error("Error creating event:", error);
      setError(error.message || "Something went wrong!");
      alert(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">Event Name</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded"
            type="text"
            id="name"
            name="name"
            value={eventData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="date">Event Date</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded"
            type="datetime-local"
            id="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="email">Contact Email</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded"
            type="email"
            id="email"
            name="email"
            value={eventData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <button 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
      
      {error && <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
    </div>
  );
};

export default EventForm;