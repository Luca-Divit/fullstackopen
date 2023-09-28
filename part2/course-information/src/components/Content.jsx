import Part from "./Part";

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => {
        return (
          <Part key={part.id} part={part} />
        )
      })}
    </>
  )

}


export default Content
