import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
const SetAvatar = () => {
  const api = "http://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (!localStorage.getItem("Warhammer-40K-User")) {
      navigate("/login");
    }
  }, []);
  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("Warhammer-40K-User"));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("Warhammer-40K-User", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error in setting avatar. Please try again.", toastOptions);
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = [];
        for (let i = 0; i < 4; i++) {
          const response = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`,
            { responseType: "arraybuffer" }
          );
          const base64 = btoa(
            new Uint8Array(response.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          data.push(base64);
        }
        setAvatars(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          <div className="loading-animation">
            <img
              src="https://media.tenor.com/lJo5g5632N8AAAAi/ork-boy-shootas-blood-teef.gif"
              alt="loader"
              className="loader"
            />
            <img
              src="https://media.tenor.com/VIatJqfN6R4AAAAi/intercessors-shootas-blood-teef.gif"
              alt="loader"
              className="loader"
            />
          </div>
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-button">
            Set as Profile Picture
          </button>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #29311d;
  height: 100vh;
  width: 100vw;
  .loading-animation {
    display: flex;
    justify-content: center;
    flex-direction: row;
    border-bottom: 2px solid white;
  }

  .loader {
    max-width: 100%;
    height: auto;
  }

  .title-container {
    h1 {
      color: white;
    }
  }

  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5ms ease-in-out;

      img {
        height: 6rem;
      }
    }

    .selected {
      border: 0.4rem solid #95b273;
    }
  }

  .submit-button {
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
`;

export default SetAvatar;
