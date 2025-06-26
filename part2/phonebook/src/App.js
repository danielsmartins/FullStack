import { useEffect, useState } from 'react';
import './index.css';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import PersonsService from './services/persons';

const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  return <div className={type}>{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [noti, setNoti] = useState({ message: null, type: '' });

  useEffect(() => {
    PersonsService.getAll().then(data => setPersons(data));
  }, []);

  const clearNotification = () => {
    setTimeout(() => {
      setNoti({ message: null, type: '' });
    }, 5000);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      PersonsService.remove(id)
        .then(() => {
          setPersons(currentPersons => currentPersons.filter(p => p.id !== id));
          setNoti({ message: `Deleted ${name}`, type: 'success' });
          clearNotification();
        })
        .catch(error => {
          setNoti({
            message: `Information of ${name} has already been removed from server`,
            type: 'error',
          });
          clearNotification();
          // Garante que o item removido também seja removido da UI
          setPersons(currentPersons => currentPersons.filter(p => p.id !== id));
        });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const existingPerson = persons.find(
      person => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        PersonsService.update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(
              persons.map(p => (p.id !== existingPerson.id ? p : returnedPerson))
            );
            setNewName('');
            setNewNumber('');
            setNoti({ message: `Updated ${returnedPerson.name}`, type: 'success' });
            clearNotification();
          })
           .catch(error => {

          // Verifica se é um erro de validação (400) ou outro erro
          if (error.response && error.response.data.error) {
            // Mostra a mensagem de erro vinda do servidor 
            setNoti({ message: error.response.data.error, type: 'error' });
          } else {
            // Caso genérico, como o de a pessoa já ter sido removida (404)
            setNoti({
              message: `Information of ${existingPerson.name} has already been removed from server`,
              type: 'error',
            });
            // Só remove a pessoa da lista neste caso
            setPersons(persons.filter(p => p.id !== existingPerson.id));
          }
          clearNotification();
        });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };

      PersonsService.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          setNoti({ message: `Added ${returnedPerson.name}`, type: 'success' });
          clearNotification();
        })
        .catch(error => {
          setNoti({ message: error.response.data.error, type: 'error' });
          clearNotification();
        });
    }
  };

  const handleFilterChange = e => setFilter(e.target.value);

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container">
      <h2>Phonebook</h2>
      <Notification message={noti?.message} type={noti?.type} />

      <Filter value={filter} onChange={handleFilterChange} />

      <h3>Add a new phone number</h3>
      <PersonForm
        onSubmit={handleSubmit}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h3>Numbers</h3>

      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  );
} // A chave extra foi removida daqui

export default App;