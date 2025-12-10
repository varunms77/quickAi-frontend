import axios from "axios";
import { getAuth } from "firebase/auth";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Attach Firebase Token Automatically
apiClient.interceptors.request.use(async (config) => {
  const user = getAuth().currentUser;

  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiClient;