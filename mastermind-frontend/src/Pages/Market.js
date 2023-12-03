import React, { useState, useEffect } from "react";
import "./Market.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Market({ currentId }) {
  const [products, setProducts] = useState(null);
  // const [userId, setUserId] = useState("");
  const [userTotalScore, setUserTotalScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // function to call API to get all products in DB
  const displayAllItems = () => {
    axios
      .get("https://matermind-backend.wl.r.appspot.com/item/findAllItemRecords")
      .then((response) => {
        setProducts(response.data);
        // setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    displayAllItems(); // Using Axios to fetch data
    getTotalScore();
  }, []);

  const getTotalScore = () => {
    axios
      .get(
        `https://matermind-backend.wl.r.appspot.com/user/findByUserId?userId=${
          currentId ? currentId : localStorage.getItem("playerId")
        }`
      )
      .then((response) => {
        setUserTotalScore(response.data.totalScore);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  //
  const buyItem = (id, price, stock) => {
    // console.log("The user score is" + user.totalScore);
    if (userTotalScore - price < 0) {
      alert("You don't have enough scores to purchase this item!");
    } else if (stock === 0) {
      alert("The item is out of stock. Please choose other ones");
    } else {
      updateItemCount(id);
      updateScore(price);
    }
  };
  // function to update stock when buying item
  const updateItemCount = (itemId) => {
    axios
      .get(
        `https://matermind-backend.wl.r.appspot.com/item/buyById?id=${itemId}`
      )
      .then((response) => {
        displayAllItems();
      });
  };

  const updateScore = async (price) => {
    const postData = {
      userId: currentId ? currentId : localStorage.getItem("playerId"),
      score: -price,
    };
    axios
      .post(
        "https://matermind-backend.wl.r.appspot.com/user/saveOrUpdateTotalScore",
        postData
      )
      .then((response) => {
        getTotalScore();
      });
  };

  if (loading || !products) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container>
      <div className="market-container">
        {/* Header */}
        <div className="headlink-container">
          <div>
            <Link
              to="/record"
              className="link"
              style={{ textDecoration: "none", color: "#343a40" }}
            >
              {/* <FontAwesomeIcon icon={faGamepad} size="2x" /> */}
              <span className="ranking-text">Ranking</span>
            </Link>
          </div>
          <div>
            <Link
              to="/play"
              className="link"
              style={{ textDecoration: "none", color: "#343a40" }}
            >
              <FontAwesomeIcon icon={faGamepad} size="1x" />
              <span className="ranking-text">Game</span>
            </Link>
          </div>
        </div>

        <div className="total-score-container">
          <p>Your total score is {userTotalScore}</p>
        </div>

        {/* Product List */}
        <div className="product-container">
          <Row className="product-header">
            <Col>Category</Col>
            <Col>Name</Col>
            <Col>Price</Col>
            <Col>Stock</Col>
            <Col> </Col>
          </Row>
          {products.map((product) => (
            <Row key={product.id} className="product-item">
              <Col>{product.category}</Col>
              <Col>{product.item}</Col>
              <Col>${product.price}</Col>
              <Col>{product.stock}</Col>
              <Col>
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  size="1x"
                  style={{ color: "#343a40" }}
                  onClick={() => {
                    buyItem(product.id, product.price, product.stock);
                  }}
                />
              </Col>
            </Row>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Market;
