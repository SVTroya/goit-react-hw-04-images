import { StyledContainer } from './App.styled';
import { useEffect, useState } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Searchbar } from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import { fetchImagesWithQuery, IMAGES_PER_PAGE } from '../services/api';
import { Modal } from './Modal/Modal';

export function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await fetchImagesWithQuery({ q: searchQuery, page });
        setImages(prev => [...prev, ...data.images]);
        setTotalPages(Math.ceil(data.totalHits / IMAGES_PER_PAGE));
      } catch (err) {
        console.log(err);
        setImages([]);
        setTotalPages(0);
      } finally {
      }
      setIsLoading(false);
    }

    fetchData();
  }, [searchQuery, page]);

  function handleSearch(search) {
    setImages([]);
    setSearchQuery(search);
    setPage(1);
  }

  function handleShowMore() {
    setPage(prev => prev + 1);
  }

  function handleToggleModal() {
    setIsModalOpen(prev => !prev);
  }

  function handleImageClick(largeImg, alt) {
    setModalImg({ largeImg, alt });
    handleToggleModal();
  }

  return (
    <StyledContainer>
      <Searchbar handleSearch={handleSearch} />
      {images.length > 0
        ? <ImageGallery images={images} onClick={handleImageClick} /> : null}
        {/*? <ImageGallery images={images} onClick={handleImageClick} /> : <p>Sorry, but nothing were found 😢</p>}*/}
      {(images.length > 0 && page < totalPages)
        ? <Button onClickHandler={handleShowMore} />
        : null}
      <Loader visible={isLoading} />
      {isModalOpen
        ? <Modal onClose={handleToggleModal}>
          <img src={modalImg.largeImg} alt={modalImg.alt} />
        </Modal>
        : null}
    </StyledContainer>
  );
}
