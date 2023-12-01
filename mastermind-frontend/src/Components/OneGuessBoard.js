import CheckMatches from "../CheckMatches";
import { useEffect, useState } from "react";
import Circle from "./Circle";

function OneGuessBoard({
    selectColor,
    isActive,
    phrase,
    onRowSubmit,
    isReset,
    onWin,
  }) {
    const [colors, setColors] = useState(Array(4).fill("#a3a3a3"));
  
    function handleClick(i) {
      const newColors = colors.slice();
      newColors[i] = selectColor;
      {
        isActive() && setColors(newColors);
      }
    }
  
    const [match, setMatch] = useState([null, null]);
  
    function handleSubmitClick() {
      if (colors.every((color) => color !== "#a3a3a3")) {
        const [exact, partial] = CheckMatches(phrase, colors);
        setMatch([exact, partial]);
        if (exact == 4) {
          onWin();
        } else {
          onRowSubmit();
        }
      } else {
        alert("You should finish the guess first");
      }
    }
  
    //clear all the circles' colors and promp buttons whenever the "Play Again" button gets called
    //When clicking "Play Again", isReset's value filps, which triggers seColors and setMatch get called
    useEffect(() => {
      setColors(Array(4).fill("#a3a3a3"));
      setMatch([null, null]);
    }, [isReset]);
  
    return (
      <>
        <div className="board-row">
          <div className="circle-container">
            <Circle color={colors[0]} onCircleClick={() => handleClick(0)} />
            <Circle color={colors[1]} onCircleClick={() => handleClick(1)} />
            <Circle color={colors[2]} onCircleClick={() => handleClick(2)} />
            <Circle color={colors[3]} onCircleClick={() => handleClick(3)} />
          </div>
          <div className="submit-container">
            {isActive() && (
              <button className="submit" onClick={handleSubmitClick}>
                Submit
              </button>
            )}
            {match[0] !== null && match[1] !== null && (
              <button className="submit">
                {match[0]} exact, {match[1]} partial
              </button>
            )}
          </div>
        </div>
      </>
    );
}

export default OneGuessBoard;