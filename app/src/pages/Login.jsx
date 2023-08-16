
import {useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import validator from "validator";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem("jwtToken")){
      navigate("/");
    }
  },[]);

  const [input, setInput]=useState({email: "", password: ""});


  const handleChange =(e)=>{
    setInput({...input, [e.target.name]: e.target.value});
  }

  const handleLogin = async(e)=>{
    e.preventDefault();
    const isValid = validation(input);
    if(isValid){
      try {
        const response = await axios.post("http://localhost:3000/login", input);
        if(response.status==200){
          console.log(response.data);
          localStorage.setItem("jwtToken", response.data.jwtToken);
          navigate("/");
        } else {
          console.log("Unexpected response:", response.data.error);
      }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            console.log("Error:", error.response.data.error);
        } else {
            console.log("An error occurred:", error);
        }
      }
    }


  }

  const validation = (data)=>{
    const {email, password}=data;
    let isValid = true;

    if(!email||!validator.isEmail(email)){
      console.warn("invalid email");
      isValid = false;
    }

    if(!password||!validator.isLength(password, {min:8})){
      console.warn("invalid password");
      isValid = false;
    }
    return isValid

  }
  return (
    <div>
      <h2>
        Login
      </h2>
      
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" onChange={handleChange} value={input.email} />

        <label htmlFor="password">Password</label>
        <input type="text" id="password" name="password" onChange={handleChange} value={input.password} />

        <button type="submit">Login</button>

        <span> Didnot have an account? <Link to="/register">Register Here</Link></span>
        
      </form>

    </div>
  )
}
export default Login