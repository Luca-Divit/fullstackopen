// import { useState } from "react";
import Header from "./Header";
import Content from "./Content";

const Course = ({course}) => {
  // console.log(props)
  return (
    <>
      <Header course={course.name}/>
      <Content parts={course.parts} />
    </>
  );
};

export default Course;
