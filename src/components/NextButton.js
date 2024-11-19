export default function NextButton({
  dispatch,
  answer,
  curIndex,
  questionsLength,
}) {
  if (answer === null) return null;

  if (curIndex < questionsLength - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "next-question" })}
      >
        Next
      </button>
    );

  if (curIndex === questionsLength - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "quiz-finished" })}
      >
        Finish
      </button>
    );
}
