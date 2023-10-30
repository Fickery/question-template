import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/question");
    console.log("question page");
  };

  return (
    <main>
      <div className="start-cont">
        <p className="font-black40">Question App</p>
        <button onClick={handleStart} className="big-btn">
          Start
        </button>
      </div>
    </main>
  );
};

export default StartPage;
