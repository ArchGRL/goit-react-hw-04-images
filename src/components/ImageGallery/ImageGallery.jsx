import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from 'components/ImageGallery/ImageGallery.module.css';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images }) => {
  return (
    <ul className={css.imageGallery}>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          smallImg={webformatURL}
          tags={tags}
          largeImageURL={largeImageURL}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
};