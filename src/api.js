import axios from "axios"; 

const API_BASE_URL = "http://localhost:5000"; // Update with your backend URL if hosted on AWS

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to create an event
export const createEvent = async (eventData) => {
  return await api.post("/events", eventData);
};

// Function to fetch all events
export const getEvents = async () => {
  return await api.get("/events");
};

export default api;
