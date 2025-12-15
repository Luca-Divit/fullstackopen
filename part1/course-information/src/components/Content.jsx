import Part from "./Part";

const Content = ({ course }) => {
  // console.log(course.parts);
  return course.parts.map((part) => {
    return <Part key={part.name} name={part.name} exercises={part.exercises} />;
  });
};

export default Content;
