import { useEffect, useState } from "react";
import validator from "validator";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem("jwtToken")){
      navigate("/");
    }
  },[]);

  const [input, setInput]=useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e)=>{
    setInput({...input, [e.target.name]: e.target.value});
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    const isValid = validation(input);
    if (isValid) {
      try {
        const response = await axios.post("http://localhost:3000/register", input);
        if (response.status === 200) {
          console.log(response.data);
          navigate("/login");
        }
      } catch (error) {
        console.error("can't register user:", error);
      }
    }
  };

  const validation = (data) => {
    const { email, username, password, confirmPassword } = data;
    let isValid = true;

    if (!email || !validator.isEmail(email)) {
      console.warn("invalid email");
      isValid = false;
    }
    if (!username || !validator.isLength(username, { min: 3, max: 30 })) {
      console.warn("invalid username");
      isValid = false;
    }
    if (!password || !validator.isLength(password, { min: 8 })) {
      console.warn("invalid password");
      isValid = false;
    }
    if (!confirmPassword || password !== confirmPassword) {
      console.warn("password and confirm password didn't match");
      isValid = false;
    }

    return isValid;
  };


  return (
    <div>
      <div>
        <h2>Register</h2>
      </div>
      <form onSubmit={handleRegister}>

        <label htmlFor="email">Email</label>
        <input name="email" onChange={handleChange} value={input.email} />

        <label htmlFor="username">User Name</label>
        <input name="username" onChange={handleChange} value={input.username} />

        <label htmlFor="password">Password</label>
        <input name="password" onChange={handleChange} value={input.password} />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input name="confirmPassword" onChange={handleChange} value={input.confirmPassword} />

        <button type="submit">Register</button>

        <span>Already have an account? <Link to="/login">Login here</Link></span>
      </form>


    </div>
  )
}
export default Register