import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import css from 'components/Searchbar/Searchbar.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

export default class Searchbar extends Component {
  state = {
    value: '',
  };

  handelValueChange = e => {
    this.setState({ value: e.currentTarget.value.toLowerCase() });
  };

  hendelSubmitForm = e => {
    e.preventDefault();
    if (this.state.value.trim() === '') {
      toast('Please, fill in the search field.');
      return;
    }
    this.props.onSubmit(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    return (
      <header onSubmit={this.hendelSubmitForm} className={css.searchbar}>
        <form className={css.searchForm}>
          <button type="submit" className={css.searchForm_button}>
            <ImSearch></ImSearch>
          </button>

          <input
            className={css.searchForm_input}
            type="text"
            name="value"
            value={this.state.value}
            onChange={this.handelValueChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};