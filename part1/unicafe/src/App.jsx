import { useState } from "react";

const Button = ({handleClick, text}) => {
  // console.log(props);
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({text, value}) => <p>{text} {value}</p>;

const Statistics = ({good, neutral, bad, allFeedback, average, positive}) => {
  // console.log(props)
  return (
    <>
      <h1>statistics</h1>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={allFeedback} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} />
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allFeedback, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const incrementGood = () => {
    const newGood = good + 1
    const newAll = allFeedback + 1
    setGood(newGood);
    setAll(newAll);
    setAverage((newGood - bad) / newAll);
    setPositive(newGood / newAll * 100);
  };

  const incrementNeutral = () => {
    const newNeutral = neutral + 1
    const newAll = allFeedback + 1
    setNeutral(newNeutral);
    setAll(newAll);
    setAverage((good - bad) / newAll);
    setPositive(good / newAll * 100);
  };

  const incrementBad = () => {
    const newBad = bad + 1
    const newAll = allFeedback + 1
    setBad(newBad);
    setAll(newAll);
    setAverage((good - newBad) / newAll);
    setPositive(good / newAll * 100);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={incrementGood} text="good" />
      <Button handleClick={incrementNeutral} text="neutral" />
      <Button handleClick={incrementBad} text="bad" />
      { allFeedback?
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          allFeedback={allFeedback}
          average={average}
          positive={positive}
        /> :
        <p>No feedback given</p>
      }

    </div>
  );
};

export default App;
