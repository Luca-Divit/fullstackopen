import Part from "./Part";
import Total from "./Total";

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => {
        return (
          <Part key={part.id} part={part} />
        )
      })}
      <Total sum={parts.reduce((sum,part) => sum += part.exercises, 0)} />
    </>
  );
};


export default Content;
