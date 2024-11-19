export default function Progress({
  index,
  questionsLength,
  points,
  maxPossiblePoints,
}) {
  return (
    <div className="progress">
      <progress max={questionsLength} value={index + 1} />
      <p>
        Questions <strong>{index + 1}</strong> / {questionsLength}
      </p>

      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </div>
  );
}
