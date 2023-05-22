import React, { Component } from 'react';
import { Modal } from 'components/Modal/Modal';
import css from 'components/ImageGalleryItem/ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  handleImageClick = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.key === 'Escape') {
      this.setState({ showModal: false });
    }
  };

  handleClickOutside = e => {
    if (e.target !== e.currentTarget) {
      return;
    }
    this.setState({ showModal: false });
  };

  render() {
    const { showModal } = this.state;
    const { smallImg, tags, largeImageURL } = this.props;
    return (
      <li className={css.imageGalleryItem}>
        <img
          className={css.imageGalleryItem_image}
          src={smallImg}
          alt={tags}
          onClick={this.handleImageClick}
        />
        {showModal && (
          <Modal
            onClickOutside={this.handleClickOutside}
            largeImageURL={largeImageURL}
            tags={tags}
          />
        )}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
