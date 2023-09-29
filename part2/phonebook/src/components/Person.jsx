const Person = ({p, handleDelete}) => {
  return (
    <div>
      {p.name} {p.number}
      <button onClick={handleDelete}>delete</button>
    </div>
  )
};

export default Person;
