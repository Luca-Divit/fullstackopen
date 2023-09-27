import { useState } from "react";

const Button = ({handleClick, text}) => {
  // console.log(props);
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allFeedback, setAll] = useState(0);

  const incrementGood = () => {
    setGood(good + 1);
    setAll(allFeedback + 1);
  }

  const incrementNeutral = () => {
    setNeutral(neutral + 1);
    setAll(allFeedback + 1);
  }

  const incrementBad = () => {
    setBad(bad + 1);
    setAll(allFeedback + 1);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={incrementGood} text="good" />
      <Button handleClick={incrementNeutral} text="neutral" />
      <Button handleClick={incrementBad} text="bad" />
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>average {allFeedback ? (good - bad) / allFeedback : 0}</p>
      <p>positive {good ? good / allFeedback * 100 + "%" : 0}</p>
    </div>
  );
};

export default App;
