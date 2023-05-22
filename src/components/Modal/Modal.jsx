import css from 'components/Modal/Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = ({ onClickOutside, largeImageURL, tags }) => {
  return (
    <div className={css.overlay} onClick={onClickOutside}>
      <div className={css.modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClickOutside: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
