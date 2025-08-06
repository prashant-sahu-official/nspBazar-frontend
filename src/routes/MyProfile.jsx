import { Navigate, useNavigate } from "react-router-dom";
import { RiShutDownLine } from "react-icons/ri";
import './MyProfile.css'; 

const MyProfile = () => {
    const navigate = useNavigate();
  const handleOnClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem("userId");  
    localStorage.removeItem("userName");  
    alert("Logged out successfully");
    navigate("/login", { replace: true });
  };

  return (
    <div className="my-profile-container">
      <h2 className="my-profile-title">Welcome {localStorage.getItem("userName")} ! </h2>
      <button className="logout_button" onClick={handleOnClick}><RiShutDownLine /></button>
    </div>
  );
};

export default MyProfile;