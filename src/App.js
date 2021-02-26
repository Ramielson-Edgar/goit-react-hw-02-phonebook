import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../src/bases.css';
import shortid from 'shortid';
import ContactForm from './Phonebook/ContactForm';
import ContactList from './Phonebook/ContactList';
import Filter from './Phonebook/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const presistedContacts = localStorage.getItem('contacts');

    if (presistedContacts) {
      this.setState({ contacts: JSON.parse(presistedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      console.log('componentDidUpdate');
    }
  }

  addContact = ({ name, number }) => {
    const numbers = {
      id: shortid.generate(),
      name,
      number,
    };

    this.setState(prevState => {
      const { contacts } = this.state;
      if (contacts.find(item => item.name === name)) {
        alert(`${name} is already in contacts`);
        return;
      }

      return {
        contacts: [numbers, ...prevState.contacts],
      };
    });
  };

  handleChangeFilter = filter => {
    this.setState({ filter });
  };

  getVisible = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(text =>
      text.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  removeContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;
    const getVisibleContacts = this.getVisible();

    return (
      <>
        <div className="container">
          <h1>Phonebook</h1>
          <ContactForm addContact={this.addContact} />

          <div className="wrap">
            <h2>Contacts</h2>
            <Filter
              value={filter}
              handleChangeFilter={this.handleChangeFilter}
            />
            {getVisibleContacts.length > 0 && (
              <ContactList
                contacts={getVisibleContacts}
                onRemove={this.removeContact}
              />
            )}
          </div>
        </div>
      </>
    );
  }
}
App.propTypes = {
  filter: PropTypes.string,
  state: PropTypes.arrayOf(
    PropTypes.shape({
      contacts: PropTypes.string,
      id: PropTypes.string.isRequired,
    }),
  ),
};

export default App;
