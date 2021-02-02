import React from 'react';
import PropTypes from 'prop-types';
import s from './Filter.module.css';
const Filter = ({ value, handleChangeFilter }) => {
  return (
    <>
      <div className="wrapper">
        <p>Find contacts by name</p>
        <input
          className={s.filter}
          type="text"
          name="name"
          value={value}
          onChange={e => handleChangeFilter(e.target.value)}
        />
      </div>
    </>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  handleChangeFilter: PropTypes.func,
};

export default Filter;
