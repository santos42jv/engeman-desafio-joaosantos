import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "http://localhost:3000";

const fetchUserData = async () => {
  const response = await axios.get(`${API_URL}/api/user`);
  return response?.data?.data;
};

export function useUserData() {
  const query = useQuery({
    queryFn: fetchUserData,
    queryKey: ["user-data"],
    refetchOnWindowFocus: false,
  })
  
  return query;
} 
