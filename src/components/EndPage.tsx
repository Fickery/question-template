import React from "react";

const EndPage = ({ correctCount, totalQuestions }) => {
  const percentage = (correctCount / totalQuestions) * 100;

  return (
    <div>
      <p>You achieved {percentage.toFixed(0)}%</p>
      <p>Amazing Job!</p>
      <button>Reset</button>
    </div>
  );
};

export default EndPage;
