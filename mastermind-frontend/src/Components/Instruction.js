// Instruction Component
function Instruction() {
    const instructions = [
      "In this game, you'll have to guess colors correctly.",
      "The secret code consists of a combination of 4 colors, and your task is to figure out the correct order.",
      "You only have 10 attempts. Try to solve it within the given attempts!",
      "After each guess, you'll receive feedback. Use this feedback to refine your guesses and crack the code!",
    ];
  
    return (
      <div className="instruction">
        <h2>Instructions</h2>
        <ul>
          {instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ul>
      </div>
    );
}

export default Instruction;