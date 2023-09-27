import { useState } from 'react';

const MostVoted = ({points, anecdotes}) => {
  // console.log(points, anecdotes)
  const highestVote = Math.max(...points);
  const indexOfAnecdote = points.indexOf(highestVote);
  return (
    <>
      <p>{anecdotes[indexOfAnecdote]}</p>
      <p>has {highestVote} votes</p>
    </>
  )
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const [points, setPoints] = useState(new Uint8Array(8));
  const [selected, setSelected] = useState(0);

  const nextAnecdote = () => {
    const newValue = Math.round(Math.random()*(anecdotes.length - 1));
    // console.log(newValue)
    setSelected(newValue);
  };

  const upvote = (which) => {
    // console.log(which)
    const copy = [...points];
    // console.log('before incrementing', copy)
    copy[which] += 1;
    // console.log('after incrementing', copy)
    setPoints(copy)
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={() => upvote(selected)}>vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <MostVoted points={points} anecdotes={anecdotes} />
    </div>
  );
};

export default App
