import { useReducer } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { QuestionData, questionData } from "../data";
import { Oval } from "react-loader-spinner";

interface State {
  currQuestionIndex: number;
  correctCount: number;
  selectedAnswer: null | number;
  isHintVisible: boolean;
  isHintButtonActive: boolean;
  isHintButtonClicked: boolean;
}

type Action =
  | { type: "SELECT_ANSWER"; payload: number }
  | { type: "NEXT_QUESTION" }
  | { type: "TOGGLE_HINT_BUTTON" }
  | { type: "SKIP_QUESTION" };

const initialState: State = {
  currQuestionIndex: 0,
  correctCount: 0,
  selectedAnswer: null,
  isHintVisible: false,
  isHintButtonActive: false,
  isHintButtonClicked: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "TOGGLE_HINT_BUTTON":
      return {
        ...state,
        isHintVisible: !state.isHintVisible,
        isHintButtonActive: !state.isHintButtonActive,
        isHintButtonClicked: !state.isHintButtonClicked,
      };
    case "SELECT_ANSWER":
      return {
        ...state,
        selectedAnswer: action.payload,
      };
    case "NEXT_QUESTION":
      if (
        state.selectedAnswer !== null &&
        questionData[state.currQuestionIndex].options[state.selectedAnswer]
          .isCorrect
      ) {
        return {
          ...state,
          correctCount: state.correctCount + 1,
          selectedAnswer: null,
          currQuestionIndex: state.currQuestionIndex + 1,
        };
      } else {
        return {
          ...state,
          selectedAnswer: null,
          currQuestionIndex: state.currQuestionIndex + 1,
        };
      }
    case "SKIP_QUESTION":
      return {
        ...state,
        selectedAnswer: null,
        currQuestionIndex: state.currQuestionIndex + 1,
      };
    default:
      return state;
  }
};

export async function loader() {
  const question = await questionData;
  return { questionData: question };
}

const QuestionPage = () => {
  const loaderData = useLoaderData();
  let navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  const currentQuestion: QuestionData | undefined =
    questionData[state.currQuestionIndex];

  const handleSelectAnswer = (index: number) => {
    dispatch({ type: "SELECT_ANSWER", payload: index });
  };

  const progressPercentage = () => {
    const totalCount = questionData.length;

    if (state.currQuestionIndex === totalCount - 1) {
      if (
        state.selectedAnswer !== null &&
        questionData[state.currQuestionIndex].options[state.selectedAnswer]
          .isCorrect
      ) {
        return ((state.correctCount + 1) / totalCount) * 100;
      } else {
        return (state.correctCount / totalCount) * 100;
      }
    } else {
      return (state.correctCount / totalCount) * 100;
    }
  };

  const handleNextQuestion = () => {
    console.log(currentQuestion);
    if (state.currQuestionIndex === questionData.length - 1) {
      navigate("/end", { state: { percentage: progressPercentage() } });
    } else {
      dispatch({ type: "NEXT_QUESTION" });
    }
  };

  const handleSkip = () => {
    dispatch({ type: "SKIP_QUESTION" });
  };

  const handleEnd = () => {
    const confirmed = window.confirm("Are you sure you want to end the quiz?");
    if (confirmed) {
      navigate("/end", { state: { percentage: progressPercentage() } });
    }
  };

  if (!currentQuestion) {
    navigate("/end", { state: { percentage: progressPercentage() } });
    return null;
  } // if there is no current question, navigate to the end page

  if (!loaderData) {
    return (
      <div className="loader">
        <Oval
          height={80}
          width={80}
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

  return (
    <div className="main">
      <div className="header-cont">
        <div className="header">
          <button
            className={`square-btn ${
              state.isHintButtonActive ? "activeHint" : ""
            }`}
            onClick={() => {
              dispatch({ type: "TOGGLE_HINT_BUTTON" });
            }}
          >
            Hint
          </button>
          <p className="title">{currentQuestion.questionnumber}</p>
          <button className="square-btn" onClick={handleEnd}>
            End
          </button>
        </div>
        <div className="progress-bar-cont">
          <div
            className="progress-bar"
            style={{ width: `${progressPercentage()}%` }}
          ></div>
        </div>
      </div>

      <div className="question-content">
        <p className="question-percentage">
          {Math.round(progressPercentage())}%
        </p>
        <p className="question">{currentQuestion.title}</p>
        <p
          className="question-hint"
          style={{
            opacity: state.isHintVisible && state.isHintButtonClicked ? 1 : 0,
            transition: "opacity 0.25s",
          }}
        >
          *{currentQuestion.questionhint}
        </p>
        <ul className="answer-main">
          {currentQuestion.options.map((option, i) => (
            <li
              className={`answer-content ${
                state.selectedAnswer === i ? "active" : ""
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
        <button className="small-btn" onClick={() => handleSkip()}>
          Skip
        </button>
        <button
          className="small-btn"
          onClick={() => handleNextQuestion()}
          disabled={state.selectedAnswer === null}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default QuestionPage;
