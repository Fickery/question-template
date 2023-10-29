import { Link } from "react-router-dom";

const StartPage = () => {
  return (
    <main>
      <div className="start-cont">
        <p className="font-black40">Question App</p>
        <Link to="question" className="big-btn">
          Start
        </Link>
      </div>
    </main>
  );
};

export default StartPage;
