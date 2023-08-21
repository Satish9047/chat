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
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center h-full">
      <div>
        <h2 className="text-5xl font-thin">Register</h2>
      </div>
      <form onSubmit={handleRegister} className="flex flex-col justify-center space-y-1">

        <label htmlFor="email">Email</label>
        <input name="email" id="email" onChange={handleChange} value={input.email} className="sm:py-1 border border-spacing-2 border-blue-900"/>

        <label htmlFor="username">User Name</label>
        <input name="username" id="username" onChange={handleChange} value={input.username} className="sm:py-1 border border-spacing-2 border-blue-900"/>

        <label htmlFor="password">Password</label>
        <input name="password" id="password" onChange={handleChange} value={input.password} className=" sm:py-1 border border-spacing-2 border-blue-900"/>

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input name="confirmPassword" id='confirmPassword' onChange={handleChange} value={input.confirmPassword} className="sm:py-1 border border-spacing-2 border-blue-900"/>

        <button type="submit" className="my-2 py-1 sm:py-2 bg-[#5B9A8B] hover:bg-blue-600 active:bg-blue-700">Register</button>

        <span>Already have an account? <Link to="/login" className=" text-blue-500 hover:text-blue-600 active:text-blue-700">Login here</Link></span>
      </form>

      </div>
    </div>
  )
}
export default Register