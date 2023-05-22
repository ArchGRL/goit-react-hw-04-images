import React from 'react';
import { useState, useEffect } from 'react';
import { Modal } from 'components/Modal/Modal';
import css from 'components/ImageGalleryItem/ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ smallImg, tags, largeImageURL }) {
  const [showModal, setShowModal] = useState(false);

  const handleImageClick = () => {
    setShowModal(true);
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        setShowModal(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleClickOutside = e => {
    if (e.target !== e.currentTarget) {
      return;
    }
    setShowModal(false);
  };

  return (
    <li className={css.imageGalleryItem}>
      <img
        className={css.imageGalleryItem_image}
        src={smallImg}
        alt={tags}
        onClick={handleImageClick}
      />
      {showModal && (
        <Modal
          onClickOutside={handleClickOutside}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      )}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};