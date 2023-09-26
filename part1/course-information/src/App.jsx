const App = () => {
  // const course = "Half Stack application development";
  // const part1 = "Fundamentals of React";
  // const exercises1 = 10;
  // const part2 = "Using props to pass data";
  // const exercises2 = 7;
  // const part3 = "State of a component";
  // const exercises3 = 14;

  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  const Header = (props) => {
    // console.log(props);
    return <h1>{props.course}</h1>;
  };

  const Part = (props) => {
    // console.log(props);
    return (
      <p>
        {props.part.name} {props.part.exercise}
      </p>
    );
  };

  const Content = () => {
    return (
      <>
        <Part part={part1} />
        <Part part={part2} />
        <Part part={part3} />
      </>
    );
  };

  const Total = (props) => {
    // console.log(props);
    return (
      <p>
        Number of exercises{" "}
        {props.exercises1.exercises +
          props.exercises2.exercises +
          props.exercises3.exercises}
      </p>
    );
  };

  return (
    <div>
      <Header course={course} />
      <Content />
      <Total exercises1={part1} exercises2={part2} exercises3={part3} />
    </div>
  );
};

export default App;
