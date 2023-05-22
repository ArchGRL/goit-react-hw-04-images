import { Component } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { fetchImages } from 'services/api';
import { ToastContainer } from 'react-toastify';
import css from 'components/App/App.module.css';
import 'react-toastify/dist/ReactToastify.css';

export default class App extends Component {
  state = {
    value: '',
    images: [],
    error: null,
    page: 1,
    status: 'idle',
  };

  handleSubmit = async value => {
    this.setState({ value, status: 'panding', error: null });

    try {
      const images = await fetchImages(value);
      this.setState({ images: images.hits, status: 'resolved' });
    } catch (error) {
      this.setState({ error: error.message, status: 'rejected' });
    }
  };

  loadMoreImages = async () => {
    this.setState({ status: 'panding' });

    try {
      const { value, page } = this.state;
      const images = await fetchImages(value, page + 1);
      this.setState(prevState => ({
        images: [...prevState.images, ...images.hits],
        page: prevState.page + 1,
        status: 'resolved',
      }));
    } catch (error) {
      this.setState({ error: error.message, status: 'rejected' });
      console.log(error.message);
    }
  };

  render() {
    const { value, status, images, error } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        {status === 'panding' && <Loader />}

        <ImageGallery images={images} />

        {status === 'resolved' && images.length >= 12 && (
          <Button onClick={this.loadMoreImages} />
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
}