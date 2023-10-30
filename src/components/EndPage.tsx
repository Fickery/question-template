import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

const EndPage = () => {
  const [, setShowConfetti] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const percentage =
    location.state && location.state.percentage ? location.state.percentage : 0;
  console.log(percentage);

  const handleStart = () => {
    navigate("/question");
    console.log("question page");
  };

  return (
    <div>
      {percentage > 50 && <Confetti />}
      <p className="percentage">You achieved {percentage.toFixed(0)}%</p>
      <p className="font-black40">
        {percentage > 50
          ? "Amazing Job! 😎"
          : percentage <= 20
          ? "You can do better than that! 😅"
          : "Try Again 😅"}
      </p>
      <button className="big-btn" onClick={handleStart}>
        Reset
      </button>
    </div>
  );
};

export default EndPage;
