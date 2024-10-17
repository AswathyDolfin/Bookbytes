import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../Style/Logreg.css'
function RegisterUser() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    try {
      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userEmail)) {
        alert("Invalid email format");
        return;
      }

      // Password length validation
      if (userPassword.length < 6) {
        alert("Password must be at least 6 characters long");
        return;
      }
      const res = await axios.post("http://localhost:5000/api/user/create", {
        name: userName,
        email: userEmail,
        password: userPassword
      });
      if (res.data.success) {
        console.log("response", res.data);
        alert("Registration successful");
        navigate("/log");
        setUserName('');
        setUserEmail('');
        setUserPassword('');
      } else {
        alert(res.data.msg);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        alert(error.response.data.msg);
      } else {
        alert("Registration failed");
      }
      console.log(error);
    }
  };

  return (
    <div className="back">
      <br /><br /><br /> <br /><br /><br />
      <div className="container">
        <h1>SIGN IN</h1>
        <div className="field">
          <input
            type="text"
            placeholder="Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </div>
        <button className="ls" onClick={register}>REGISTER</button><br /><br />
        <a className="new" href="/log">Already Have An Account?</a>
      </div>
    </div>
  );
}

export default RegisterUser;
