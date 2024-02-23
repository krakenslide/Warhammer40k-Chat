import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import styled from "styled-components";
import { MdOutlineLogout } from "react-icons/md";

const Logout = () => {
    const navigate = useNavigate();
    const handleClick = async() =>{
        localStorage.clear();
        navigate("/login");
    }
  return (
    <Button>
        <MdOutlineLogout onClick = {handleClick}/>
    </Button>
  )
}

const Button = styled.button`
display: flex;
justify-content: center;
align-items: center;
padding: 0.5rem;
border-radius: 0.5rem;
background-color: #29311d;
border: none;
cursor: pointer;
svg {
  font-size: 1.3rem;
  color: #ebe7ff;
}
   
`;

export default Logout