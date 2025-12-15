import Total from "./Total";
import Header from "./Header";
import Content from "./Content";

const Courses = ({ courses }) => {
  return (
    <>
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
          </div>
        );
      })}
    </>
  );
};

export default Courses;
