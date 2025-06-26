const Persons = ({ persons, handleDelete }) => (
  <div>
    {persons.map(person => (
      <div className="person-item" key={person.id}>
        <span>
          <span className="person-name">{person.name}</span>
          <span className="person-number"> {person.number}</span>
        </span>
        <button
          className="delete-button"
          onClick={() => handleDelete(person.id, person.name)}
        >
          delete
        </button>
      </div>
    ))}
  </div>
)

export default Persons
