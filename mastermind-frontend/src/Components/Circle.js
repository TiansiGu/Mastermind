// Circle Component, representing each circle/color to be guessed in the Board
function Circle({ color, onCircleClick }) {
    return (
      <button
        className="circle"
        onClick={onCircleClick}
        style={{ backgroundColor: color }}
      ></button>
    );
}
 export default Circle;