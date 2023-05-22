import React from 'react';
import { useState } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { fetchImages } from 'services/api';
import { ToastContainer } from 'react-toastify';
import css from 'components/App/App.module.css';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [value, setValue] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [status, setStatus] = useState('idle');

  const handleSubmit = async value => {
    setValue(value);
    setStatus('panding');
    setError(null);

    try {
      const images = await fetchImages(value);
        const { hits, totalHits } = images;
      setImages(hits);
      setTotalPages(Math.ceil(totalHits / 12));
      setStatus('resolved');
    } catch (error) {
      setError(error.message);
      setStatus('rejected');
    }
  };

  const loadMoreImages = async () => {
    setStatus('panding');

    try {
      const nextPage = page + 1;
      const images = await fetchImages(value, nextPage);
      setImages(prevImages => [...prevImages, ...images.hits]);
      setPage(nextPage);
      setStatus('resolved');
    } catch (error) {
      setError(error.message);
      setStatus('rejected');
    }
  };

  const isLastPage = page === totalPages;

  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />
      {status === 'panding' && <Loader />}

      <ImageGallery images={images} />

      {status === 'resolved' && images.length >= 12 && !isLastPage && (
        <Button onClick={loadMoreImages} />
      )}

      {status === 'rejected' && (
        <h1 className={css.error}>
          Whoops, something went wrong: {error.message}
        </h1>
      )}

      {status !== 'idle' && status !== 'panding' && images.length === 0 && (
        <h1 className={css.error}>No images by request "{value}".</h1>
      )}

      <ToastContainer autoClose={2000} />
    </div>
  );
}