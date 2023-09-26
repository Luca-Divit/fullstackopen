const App = () => {
  // First part using variables
  // const course = "Half Stack application development";
  // const part1 = "Fundamentals of React";
  // const exercises1 = 10;
  // const part2 = "Using props to pass data";
  // const exercises2 = 7;
  // const part3 = "State of a component";
  // const exercises3 = 14;

  // Second part using parts as an array
  // const course = "Half Stack application development";
  // const parts = [
  //   {
  //     name: "Fundamentals of React",
  //     exercises: 10,
  //   },
  //   {
  //     name: "Using props to pass data",
  //     exercises: 7,
  //   },
  //   {
  //     name: "State of a component",
  //     exercises: 14,
  //   },
  // ];

  // Third part using everything as an object named course
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  const Header = (props) => {
    // console.log(props);
    return <h1>{props.course.name}</h1>;
  };

  const Part = (props) => {
    // console.log(props);
    return (
      <p>
        {props.name} {props.exercises}
      </p>
    );
  };

  const Content = (props) => {
    // console.log(props.course.parts);
    return props.course.parts.map((part) => {
      return (
        <Part key={part.name} name={part.name} exercises={part.exercises} />
      );
    });
  };

  const Total = (props) => {
    // console.log(props);
    let totalNumberOfExercises = 0;
    for (let i = 0; i < props.course.parts.length; i++) {
      totalNumberOfExercises += props.course.parts[i].exercises;
    }
    return <p>Number of exercises {totalNumberOfExercises}</p>;
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;
