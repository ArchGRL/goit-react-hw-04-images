import React from 'react';
import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import css from 'components/Searchbar/Searchbar.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
  const [value, setValue] = useState('');

  const handelValueChange = e => {
    setValue(e.currentTarget.value.toLowerCase());
  };

  const hendelSubmitForm = e => {
    e.preventDefault();
    if (value.trim() === '') {
      toast('Please, fill in the search field.');
      return;
    }
    onSubmit(value);
    setValue('');
  };

  return (
    <header onSubmit={hendelSubmitForm} className={css.searchbar}>
      <form className={css.searchForm}>
        <button type="submit" className={css.searchForm_button}>
          <ImSearch></ImSearch>
        </button>

        <input
          className={css.searchForm_input}
          type="text"
          name="value"
          value={value}
          onChange={handelValueChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};