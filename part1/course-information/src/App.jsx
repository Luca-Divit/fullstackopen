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
  // const course = {
  //   name: "Half Stack application development",
  //   parts: [
  //     {
  //       name: "Fundamentals of React",
  //       exercises: 10,
  //     },
  //     {
  //       name: "Using props to pass data",
  //       exercises: 7,
  //     },
  //     {
  //       name: "State of a component",
  //       exercises: 14,
  //     },
  //     {
  //       name: "Redux",
  //       exercises: 11,
  //     },
  //   ],
  // };

  // Fourth part allow arbitrary number of courses
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  const Header = ({ course }) => {
    // console.log(course);
    return <h1>{course.name}</h1>;
  };

  const Part = ({ name, exercises }) => {
    // console.log(name, exercises);
    return (
      <p>
        {name} {exercises}
      </p>
    );
  };

  const Content = ({ course }) => {
    // console.log(course.parts);
    return course.parts.map((part) => {
      return (
        <Part key={part.name} name={part.name} exercises={part.exercises} />
      );
    });
  };

  const Total = ({ course }) => {
    // console.log(course.parts);
    const totalNumberOfExercises = course.parts.reduce((sum, part) => {
      // console.log('sum:', sum, 'part:', part.exercises)
      return (sum += part.exercises);
    }, 0);
    return <b>Number of exercises {totalNumberOfExercises}</b>;
  };

  return (
    <div>
      {courses.map((course) => {
        return (
          <>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
          </>
        );
      })}
    </div>
  );
};

export default App;
