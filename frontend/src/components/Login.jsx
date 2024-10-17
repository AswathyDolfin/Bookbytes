import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import '../Style/Logreg.css'
function LogUser() {
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const navigate = useNavigate()

    const login = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/user/log",
                {
                    email: userEmail,
                    password: userPassword
                }
            )
            if (res.data.user.banned) {
                alert("Your account is banned. Please contact support for assistance.");
                return;
            }
            console.log("response", res.data)
            localStorage.setItem("authToken", res.data.authToken)
            localStorage.setItem("userID", res.data.user._id)
            alert("login sucesfull")
            navigate("/")
            setUserEmail('');
            setUserPassword('')
        } catch (error) {
            if (error.response && error.response.data && error.response.data.msg) {
                alert(error.response.data.msg);
            } else {
                alert("Login failed");
            }
            console.log(error);
        }

    };
    return (
        <div className="back">
            <br /><br /><br /> <br /><br /><br />
            <div className="container">
                <h1> LOGIN</h1>
                <div className="field">
                    <input
                        type="text"
                        placeholder="Email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder=" password"
                        value={userPassword} onChange={(e) => setUserPassword(e.target.value)}
                    />
                </div>
                <button className="ls" onClick={login}>LOGIN</button><br /><br /><br />
                <a className="new" href="/reg">Create New Account?</a>

            </div>

        </div>
    )
}
export default LogUser
