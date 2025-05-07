import { axiosInstance } from "./axios";


export const signup = async (signupData ) => {
    const response = await axiosInstance.post('/auth/signup', signupData);
    return response.data;
}

export const login = async (loginData ) => {
    const response = await axiosInstance.post('/auth/login', loginData);
    return response.data;
}

export const logout = async (logoutData ) => {
    const response = await axiosInstance.post('/auth/logout', logoutData);
    return response.data;
}

export const getAuthUser = async () => {
    try {
      const response = await axiosInstance.get('/auth/me');
      return response.data; // Return the user data directly
    } catch (error) {
      console.error("Error fetching auth user:", error);
      return null; // Optionally return null or handle the error as needed
    }
  }

export const completeOnboarding = async (userData) => {
    const response = await axiosInstance.post('/auth/onboarding', userData);
    return response.data;
}