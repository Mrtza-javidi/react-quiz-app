export default function StartScreen({ questionsLength, onStart }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{questionsLength} questions to test your React Mastery</h3>
      <button className="btn btn-ui" onClick={onStart}>
        Let's start
      </button>
    </div>
  );
}
