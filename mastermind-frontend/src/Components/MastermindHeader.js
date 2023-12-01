// Header Component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

function MastermindHeader({ onHandleUpdate, onPageUpdate }) {
  const handleRankingClick = () => {
    onPageUpdate();
  };

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
        <div className="ranking-container" onClick={handleRankingClick}>
          <span className="ranking-text">Ranking</span>
        </div>
        {/* Render the settings icon and text */}
        <div className="settings-container" onClick={handleSettingClick}>
          <FontAwesomeIcon icon={faCog} size="2x" />
          <span className="settings-text">Settings</span>
        </div>
      </div>
    </div>
  );
}

export default MastermindHeader;
