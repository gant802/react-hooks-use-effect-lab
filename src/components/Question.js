import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    if(timeRemaining === 0) {
      onAnswered(false)
      setTimeRemaining(10)
     }

     const timerId =  setTimeout(() => {
        setTimeRemaining((timeRemaining) => timeRemaining - 1); 
      }, 1000);

    // returning a cleanup function
    return function cleanup() {
      clearTimeout(timerId);
    };
  }, [timeRemaining]);

  console.log(timeRemaining)
  

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
