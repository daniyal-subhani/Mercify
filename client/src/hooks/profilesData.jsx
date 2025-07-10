import { backendRoutes } from "@/helpers/backendRoutes";
import { axiosInstance } from "@/lib/axiosInstance";
import { useEffect, useState, useCallback } from "react";

export const userProfileData = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `${backendRoutes.PROFILE.BASE}${backendRoutes.PROFILE.GET}`,
        { withCredentials: true }
      );
      setProfileData(res.data.data);
      
      setError("");
    } catch (err) {
      console.error("❌ Failed to fetch profile:", err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    profileData,
    loading,
    error,
    refetch: fetchProfile,
  };
};
