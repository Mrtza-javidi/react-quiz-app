export default function Option({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, i) => (
        <button
          className={`btn btn-option ${i === answer ? "answer" : ""} ${
            hasAnswered
              ? i === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={hasAnswered}
          key={option}
          onClick={() => dispatch({ type: "new-answer", setVal: i })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
