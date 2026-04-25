import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { AxiosToken } from "../../Api/Api";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const cookie = new Cookies();
  const token = cookie.get("auth")

  useEffect(() => {
    if(!token) return
    const fetchProfile = async () => {
      try {
        setLoading(true)
        const res = await AxiosToken.get("/auth/profile");
        setUser(res.data.user);
      } catch (err) {
        if (err.response?.status === 401) {
        cookie.remove("auth");
        navigate("/");
        }
        console.error(err);
      }
      finally{
        setLoading(false)
      }
    };

    fetchProfile();
  }, [token,navigate]);

  return (
    <ProfileContext.Provider value={{ user,loading }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);