import { useEffect } from "react";

export default function Counter({ secondsRemaining, dispatch }) {
  const min = String(Math.floor(secondsRemaining / 60)).padStart(2, 0);
  const sec = String(secondsRemaining % 60).padStart(2, 0);

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "quiz-time" });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <p className="timer">
      {min}:{sec}
    </p>
  );
}
