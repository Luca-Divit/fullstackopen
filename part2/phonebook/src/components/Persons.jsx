import Person from "./Person";

const Persons = ({
  search,
  persons,
  newPersonsList
}) => {
  return (
    search ?
    newPersonsList.map(p => <Person key={p.id} p={p} />) :
    persons.map(p => <Person key={p.id} p={p} />)

  );
};

export default Persons
