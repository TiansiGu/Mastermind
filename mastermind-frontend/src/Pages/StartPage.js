import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StartPage.css";
import axios from "axios";

import LoginForm from "../Components/LoginForm";

const StartPage = ({ onHandleChange, onUserIdChange }) => {
  // user is the currently logged in user
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState("");
  // get history object for page navigations
  const navigate = useNavigate();

  // this will be called by the LoginForm
  const HandleLogin = (user, userId) => {
    setUser(user); //after execution, user is an object, not null
    setUserId(userId);
    onUserIdChange(userId);
    console.log("The current userId is " + userId);
  };

  const [handle, setHandle] = useState("");

  const handleNameChange = (event) => {
    setHandle(event.target.value);
  };

  const handleStartClick = async () => {
    if (handle) {
      await onHandleChange(handle);
      handleSubmitHandle();
      //Imperative navigation. Didn't use <Link> because don't want to
      //enter the play game page if `handle` is empty
      navigate("/play");
    } else {
      // Input cannot be empty
      alert("You need to enter a handle before starting the game");
    }
  };

  // function to handle the user submit of a new handle
  async function handleSubmitHandle() {
    const postData = {
      userId,
      handle,
    };

    try {
      const response = await axios.post(
        "https://matermind-backend.wl.r.appspot.com/user/saveOrUpdateHandle",
        postData
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  }

  return (
    <div className="startpage-container">
      <div className="input-box">
        <div className="input-inner-box">
          <LoginForm LoginEvent={HandleLogin} />
        </div>

        {user && (
          <div className="input-inner-box">
            <input
              type="text"
              placeholder="Enter your name"
              value={handle}
              onChange={handleNameChange}
            />
            <button onClick={handleStartClick}>Start Game</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartPage;
