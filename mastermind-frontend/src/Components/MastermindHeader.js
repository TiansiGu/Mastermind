// Header Component
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faShoppingBag } from "@fortawesome/free-solid-svg-icons";

function MastermindHeader({ onHandleUpdate }) {
  const handleSettingClick = () => {
    onHandleUpdate("");
  };

  return (
    <div className="mastermind-header">
      <div className="header-content">
        <div className="header-textbox">
          <h1>Mastermind Game</h1>
          <p>Guess the secret colors!</p>
        </div>
        {/** Render the ranking text */}
        <div className="ranking-container">
          <Link to="/record" style={{ textDecoration: "none", color: "white" }}>
            <span className="ranking-text">Ranking</span>
          </Link>
        </div>
        {/* Render the settings icon and text */}
        <div>
          <Link
            to="/"
            className="settings-container"
            style={{ textDecoration: "none", color: "white" }}
            onClick={handleSettingClick}
          >
            <FontAwesomeIcon icon={faCog} size="2x" />
            <span className="settings-text">Settings</span>
          </Link>
        </div>
        <div>
          <Link
            to="/market"
            className="market-container"
            style={{ textDecoration: "none", color: "white" }}
          >
            <FontAwesomeIcon icon={faShoppingBag} size="2x" />
            {/* <span className="settings-text">Market</span> */}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MastermindHeader;
