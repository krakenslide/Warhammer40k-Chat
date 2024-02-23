import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from 'react'
import the_aquila from "../assets/the_aquila.svg";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

const Login = () => {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const userItem = localStorage.getItem('Warhammer-40K-User');
    if(userItem !== null && userItem !== undefined)
    {
      navigate("/");
    }
  }, []);

  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(handleValidation()){
      const {username, password } = values;
      const {data} = await axios.post(loginRoute, {
        username,
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
    const { password, username } = values;
    if (password === "") {
      toast.error(
        "Email and Password is required",
        toastOptions
      );
      return false;
    }
    else if (username.length === "") {
      toast.error(
        "Email and password is required",
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
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Login</button>
          <span>Create a new account ? <Link to="/register">Register</Link></span>
        </form>
      </FormContainer>
    </>
  );
};

const FormContainer = styled.div`
height: 100vh;
z-index:4;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
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
      transform: scale(1.25);
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    z-index: 3;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #181d11;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    z-index: 3;
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
    z-index: 3;
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
  .aquila {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: auto; /* Adjust as needed */
    z-index: 1;
  }
  span {
    z-index: 3;
    color: white;
    text-transform: uppercase;
    a {
      color: #536939;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Login;
