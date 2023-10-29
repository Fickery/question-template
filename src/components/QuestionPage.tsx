import { SetStateAction, useState } from "react";
import { questionData } from "../data";
import EndPage from "./EndPage";

interface QuestionData {
  questionnumber: number;
  title: string;
  questionhint: string;
  options: {
    option: string;
  }[];
  correctIndex: number;
}

const QuestionPage = () => {
  const [currQuestionIndex, setCurrQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const currentQuestion: QuestionData = questionData[currQuestionIndex];
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleSelectAnswer = (index: SetStateAction<null>) => {
    setSelectedAnswer(index);
  };

  const handleNextQuestion = () => {
    if (
      selectedAnswer !== null &&
      selectedAnswer === currentQuestion.correctIndex
    ) {
      setCorrectCount(correctCount + 1);
    }

    setSelectedAnswer(null);

    if (currQuestionIndex < questionData.length - 1) {
      setCurrQuestionIndex(currQuestionIndex + 1);
    }
  };

  if (currQuestionIndex >= questionData.length) {
    return (
      <EndPage
        correctCount={correctCount}
        totalQuestions={questionData.length}
      />
    );
  }

  return (
    <div className="main">
      <div className="header-cont">
        <div className="header">
          <button className="square-btn">Hint</button>
          <p className="title">{currentQuestion.questionnumber}</p>
          <button className="square-btn">End</button>
        </div>
        <div className="progress-bar"></div>
      </div>

      <div className="question-content">
        <p className="question">{currentQuestion.title}</p>
        <p className="question-hint">*{currentQuestion.questionhint}</p>
        <ul className="answer-main">
          {currentQuestion.options.map((option, i) => (
            <li
              className={`answer-content ${
                selectedAnswer === i ? "active" : ""
              }`}
              key={i}
              onClick={() => handleSelectAnswer(i)}
            >
              <span className="answer-choice">
                {String.fromCharCode(97 + i)}.{" "}
              </span>
              <span className="answer">{option.option}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="btn-content">
        <button className="small-btn" onClick={() => handleNextQuestion()}>
          Skip
        </button>
        <button className="small-btn" onClick={() => handleNextQuestion()}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default QuestionPage;
