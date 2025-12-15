const Total = ({ course }) => {
  const totalNumberOfExercises = course.parts.reduce((sum, part) => {
    // console.log('sum:', sum, 'part:', part.exercises)
    return (sum += part.exercises);
  }, 0);
  return <b>Number of exercises {totalNumberOfExercises}</b>;
};

export default Total;
