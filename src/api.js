import axios from "axios"; 

const API_BASE_URL = "http://event-service-alb-69402557.us-east-1.elb.amazonaws.com"; // Use your ALB endpoint

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