import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const roadmapService = {
  generate: async (data) => {
    try {
      const response = await apiClient.post("/roadmap/generate", data);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to generate roadmap. Please check backend connection.";
      throw new Error(message);
    }
  },
  
  getAll: async () => {
    try {
      const response = await apiClient.get("/roadmaps");
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to fetch roadmaps.";
      throw new Error(message);
    }
  },

  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/roadmap/${id}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to delete roadmap.";
      throw new Error(message);
    }
  },
};
