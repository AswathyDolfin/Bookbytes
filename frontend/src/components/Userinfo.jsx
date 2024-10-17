import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import '../Style/Userinfo.css'
export default function UserInfo() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user/getUser");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);


  const handleBanUser = async (userId, isBanned) => {
    try {
      const response = await axios.post("http://localhost:5000/api/user/banuser", {
        userId: userId,
        isBanned: isBanned,
      });

      console.log("User ban response:", response.data);


      const updatedUsers = users.map(user => {
        if (user._id === userId) {
          return { ...user, banned: isBanned };
        }
        return user;
      });

      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error banning user:", error);
    }
  };
  
  return (
    <div className="user-info">
      <h1>User Information</h1>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user._id} className="user-item">
            <h3>Username: {user.name}</h3>
            <p>Email: {user.email}</p>
            {/* Button to toggle ban/unban */}
            <button 
              className={user.banned ? "ban-btn unbanned" : "ban-btn"}
              onClick={() => handleBanUser(user._id, !user.banned)}
            >
              {user.banned ? "Unban" : "Ban"}
            </button>
          </li>
        ))}
      </ul>

      <Link to="/adm">
        <button className="gobck">GO Back</button>
      </Link>
    </div>
  );
}