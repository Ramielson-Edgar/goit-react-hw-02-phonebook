import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import s from './ContactForm.module.css';

class ContactForm extends Component {
  static id = shortid.generate();

  state = {
    name: '',
    number: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    this.props.addContact({ ...this.state });
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <>
        <div className={s.wrapper}>
          <form className={s.form} onSubmit={this.handleSubmit}>
            <label className={s.labelName} htmlFor={this.id}>
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Jhon Dou"
              value={name}
              onChange={this.handleChange}
              id={this.id}
              className={s.inputName}
            />
            <label className={s.labelNumber} htmlFor={this.id}>
              Number
            </label>
            <input
              type="text"
              name="number"
              placeholder="123-456-789"
              value={number}
              onChange={this.handleChange}
              id={this.id}
              className={s.inputNumber}
            />
            <button className={s.btn} type="submit" onClick={this.addContact}>
              add contact
            </button>
          </form>
        </div>
      </>
    );
  }
}

ContactForm.propTypes = {
  state: PropTypes.oneOf(['name', 'number']),
  name: PropTypes.string,
  value: PropTypes.number,
  handleChange: PropTypes.func,
  id: PropTypes.string,
};

export default ContactForm;
