import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col } from "react-bootstrap";
import "./GameRecord.css"; // Import your custom CSS file for styling
import axios from "axios";

import Pagination from "../Components/Pagination";

function GameRecord({ onGamePageChange, userId }) {
  const [selectedComponent, setSelectedComponent] = useState(true); //true represents diplaying userRecords

  // A list of gameRecords fetched by a specific userId
  // eg: [ { id: 5138716758638592, score: 120, date: "2023-01-15" },
  // { id: 5631671361601537, score: 90, date: "2023-01-10" }, ...]
  const [userScores, setUserScores] = useState(null);
  // A list of all the gameRecords fetched by findAll()
  //eg: [ { userid: "123", username: "JohnDoe", score: 150, date: "2023-01-15" },
  // { userid: "456", username: "David", score: 140, date: "2023-02-12" }, ...]
  const [highScores, setHighScores] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // function to call API to get the user's game records from DB
  async function getUserScores() {
    try {
      const response = await axios.get(
        `https://mastermind-backend-tiansi.wl.r.appspot.com/game/findByUserId?userId=${userId}&page=${page}&size=${size}`
      );
      setUserScores(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  async function getUserScores1(p) {
    try {
      const response = await axios.get(
        `https://mastermind-backend-tiansi.wl.r.appspot.com/game/findByUserId?userId=${userId}&page=${p}&size=${size}`
      );
      setUserScores(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  // function to call API to get all the game records
  async function getHighScores() {
    try {
      const response = await axios.get(
        `https://mastermind-backend-tiansi.wl.r.appspot.com/game/findAllRecords?page=${page}&size=${size}`
      );

      // Fetch userName for each userId in highScores
      const highScorePromises = response.data.map(async (highScore) => {
        const user = await axios.get(
          `https://mastermind-backend-tiansi.wl.r.appspot.com/user/findByUserId?userId=${highScore.userId}&page=${page}&size=${size}`
        );
        return {
          id: highScore.id,
          userId: highScore.userId,
          userName: user.data.handle,
          score: highScore.score,
          date: highScore.date,
        };
      });

      // Wait for all promises to resolve
      const highScoresWithNames = await Promise.all(highScorePromises);
      setHighScores(highScoresWithNames);
    } catch (error) {
      setError(error.message);
    }
  }

  const [numOfRecordByUserId, setNumOfRecordByUserId] = useState(1);
  const [numOfAllRecord, setNumOfAllRecord] = useState(1);

  const getNumOfRecordByUserId = async () => {
    try {
      // console.log("start axios request");
      const response = await axios.get(
        `https://mastermind-backend-tiansi.wl.r.appspot.com/game/findUserIdCount?userId=${userId}`
      );
      // console.log(response.data);
      setNumOfRecordByUserId(response.data);
      return response.data;
    } catch (error) {
      setError(error.message);
    }
  };

  const getNumOfAllRecord = () => {
    axios
      .get(
        `https://mastermind-backend-tiansi.wl.r.appspot.com/game/findRecordCount`
      )
      .then((response) => {
        setNumOfAllRecord(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  // pagination control
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleSizeChange = (size) => {
    setSize(size);
    setPage(0); // Reset to the first page when changing items per page
  };

  useEffect(() => {
    // call the function that fetch data from DB
    getNumOfRecordByUserId();
    getNumOfAllRecord();
    getUserScores();
    getHighScores();
  }, [selectedComponent, page, size]);

  useEffect(() => {
    setPage(0);
  }, [selectedComponent]);

  const handleDelete = async (id) => {
    console.log("Delete the game record with id " + id);
    //delete function to be implemented
    try {
      const preNum = numOfRecordByUserId;
      console.log("The total before delete is " + preNum);
      const response = await axios.delete(
        `https://mastermind-backend-tiansi.wl.r.appspot.com/game/deleteById?id=${id}`
      );
      console.log("Game record deleted successfully:", response.data);

      //try to deal with edge case 11 - 1 = 10
      const num = await getNumOfRecordByUserId();
      // console.log("The total after delete is " + num);
      // console.log(page > Math.ceil(num / size) - 1);
      if (page > Math.ceil(num / size) - 1) {
        getUserScores1(page - 1);
        setPage(page - 1);
        console.log("We are in page " + page);
      } else {
        getUserScores();
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container>
      <div className="game-record-container">
        <div className="back-container" onClick={onGamePageChange}>
          <FontAwesomeIcon icon={faArrowLeft} size="2x" />
        </div>
        <div className="select-container">
          {/* Dropdown to select the component */}
          <select
            className="form-select"
            value={selectedComponent ? "userScores" : "highScores"}
            onChange={() => setSelectedComponent(!selectedComponent)}
          >
            <option value="userScores">Your Own Scores</option>
            <option value="highScores">All High Scores</option>
          </select>
        </div>
        {/* UserScores component */}
        {selectedComponent && (
          <div className="score-container">
            {userScores.map((userScore) => (
              <Row key={userScore.id}>
                <Col>{userScore.score}</Col>
                <Col>{userScore.date}</Col>
                <Col>
                  {/* Add a delete icon with an onClick handler */}
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => handleDelete(userScore.id)}
                    style={{ cursor: "pointer" }}
                  />
                </Col>
              </Row>
            ))}
          </div>
        )}
        {/* HighScores component */}
        {!selectedComponent && (
          <div className="score-container">
            {/* <h2>High Scores</h2> */}
            <Row>
              <Col>
                <strong>UserID</strong>
              </Col>{" "}
              <Col>
                <strong>Username</strong>
              </Col>
              <Col>
                <strong>Score</strong>
              </Col>{" "}
              <Col>
                <strong>Date</strong>
              </Col>
            </Row>
            {highScores.map((highScore) => (
              <Row key={highScore.id}>
                <Col>{highScore.userId}</Col> <Col>{highScore.userName}</Col>{" "}
                <Col>{highScore.score}</Col>
                <Col>{highScore.date}</Col>
              </Row>
            ))}
          </div>
        )}
      </div>
      <Pagination
        activePage={page}
        itemsPerPage={size}
        totalItems={selectedComponent ? numOfRecordByUserId : numOfAllRecord}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleSizeChange}
        select={selectedComponent}
      />
    </Container>
  );
}

export default GameRecord;
