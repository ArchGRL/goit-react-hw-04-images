import React from 'react';
import css from 'components/Button/Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return (
    <div className={css.button_wrapper}>
      <button type="submit" className={css.button} onClick={onClick}>
        <span className="button-label">Load more</span>
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
