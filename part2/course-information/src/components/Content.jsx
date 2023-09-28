import Part from "./Part";
import Total from "./Total";

const Content = ({ parts }) => {
  let sum = 0
  return (
    <>
      {parts.map(part => {
        sum += part.exercises
        return (
          <Part key={part.id} part={part} />
        )
      })}
      <Total sum={sum} />
    </>
  );
};


export default Content;
