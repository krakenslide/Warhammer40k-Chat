import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from 'react'
import the_aquila from "../assets/the_aquila.svg";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

const Register = () => {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(handleValidation()){
      const {email,username, password } = values;
      const {data} = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if(data.status === false){
        toast.error(
          data.msg,
          toastOptions
        );
      }
      if(data.status === true){
        localStorage.setItem('Warhammer-40K-User', JSON.stringify(data.user));
        navigate("/");
    }
  }
};


  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password != confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    }
    else if (username.length < 3) {
      toast.error(
        "Username should be at least 3 characters long.",
        toastOptions
      );
      return false;
    }
    else if (password.length < 8) {
      toast.error(
        "password should be at least 8 characters long.",
        toastOptions
      );
      return false;
    }
    else if(email===""){
      toast.error(
        "Email is required",
        toastOptions
      );
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValues({...values, [event.target.name]:event.target.value});
  };

  return (
    <>
      <FormContainer>
      <div className="aquila"><img src={the_aquila} alt="Logo" /></div>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img className="The_Aquila_color" src={the_aquila} alt="The_Aquila" />
            <h1>Warhammer 40K</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create user</button>
          <span>Already have an account ? <Link to="/login">Login</Link></span>
        </form>
      </FormContainer>
    </>
  );
};

const FormContainer = styled.div`
height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  z-index:2;
  align-items: center;
  background-color: #29311d;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
      filter: brightness(0) invert(1) saturate(100%) hue-rotate(240deg);
      transform: scale(1.25)
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  .aquila {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: auto; /* Adjust as needed */
    z-index: 1;
  }

  form {
    z-index:2;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #181d11;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #536939;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #95b273;
      outline: none;
    }
  }
  button {
    background-color: #536939;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #95b273;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #536939;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Register;
