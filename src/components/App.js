import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Counter from "./Counter";

const SECS_PER_QUESTION = 20;

const initialState = {
  questions: [],
  // loading, ready, error, active, finished
  status: "loading",
  curIndex: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "data-received":
      return {
        ...state,
        questions: action.setVal,
        status: "ready",
      };

    case "data-failed":
      return {
        ...state,
        status: "error",
      };

    case "data-loading":
      return {
        ...state,
        status: "loading",
      };

    case "quiz-active":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };

    case "new-answer":
      const question = state.questions.at(state.curIndex);

      return {
        ...state,
        answer: action.setVal,
        points:
          action.setVal === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "next-question":
      return {
        ...state,
        curIndex: state.curIndex + 1,
        answer: null,
      };

    case "quiz-finished":
      return {
        ...state,
        status: "finished",
        highScore:
          state.highScore > state.points ? state.highScore : state.points,
      };

    case "quiz-restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highScore: state.highScore,
      };

    case "quiz-time":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Actions is unknown!");
  }
}

export default function App() {
  const [
    {
      questions,
      status,
      curIndex,
      answer,
      points,
      highScore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const questionsLength = questions.length;
  const maxPossiblePoints = questions.reduce((acc, cur) => acc + cur.points, 0);

  useEffect(() => {
    async function fetchQuestions() {
      dispatch({ type: "data-loading" });
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();

        dispatch({ type: "data-received", setVal: data });
      } catch (error) {
        dispatch({ type: "data-failed", setVal: error.message });
      }
    }
    fetchQuestions();

    return function () {};
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            questionsLength={questionsLength}
            onStart={() => dispatch({ type: "quiz-active" })}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              index={curIndex}
              questionsLength={questionsLength}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Question
              question={questions[curIndex]}
              dispatch={dispatch}
              answer={answer}
            />

            <NextButton
              dispatch={dispatch}
              answer={answer}
              curIndex={curIndex}
              questionsLength={questionsLength}
            />

            <Counter secondsRemaining={secondsRemaining} dispatch={dispatch} />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            dispatch={dispatch}
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highScore={highScore}
          />
        )}
      </Main>
    </div>
  );
}
