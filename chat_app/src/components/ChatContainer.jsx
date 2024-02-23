import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Logout from "../components/Logout";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";
import ChatInput from "../components/ChatInput";
import axios from "axios";
import {v4 as uuidv4} from "uuid";

export default function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
 
  useEffect(() => {
    const response = async () => {
      if (currentChat && currentUser) {
        try {
          const body = {
            from: currentUser._id,
            to: currentChat._id,
          };
          console.log(body);
          const response = await axios.post(getAllMessagesRoute, body);
          if (response) {
            console.log("response", response);
            setMessages(response.data);
          }
          // Handle the response or update state as needed
        } catch (error) {
          console.error("Error fetching data:", error);
          // Handle the error, e.g., show a notification to the user
        }
      }
    };

    response();
  }, [currentChat, currentUser]);

  async function handleSendMsg(msg) {
    const body = {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    };
    try {
      await axios
        .post(sendMessageRoute, body)
        .catch((error) => {
          console.error("Error sending message:", error);
        });
        socket.current.emit("send-message", {
          from: currentUser._id,
          to: currentChat._id,
          message: msg,
        });
        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);

    } catch (error) {
      console.error("Outer error:", error);
    }
  }
  useEffect(() => {
    if (socket && socket.current) {
      socket.current.on("msg-received", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);



  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt=""
                />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <Logout />
          </div>
          <div className="chat-messages">
            {messages.map((message) => {
              return (
                <div ref={scrollRef} key ={uuidv4()}>
                  <div className={`message ${message.fromSelf ? "sended" : "received"}`}>
                    <div className="content">
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #2e381d;
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        background-color: #516138;
      }
    }
  }
`;
