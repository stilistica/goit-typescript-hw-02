import "./App.css";
import { useEffect, useState } from "react";
import { fetchGallery } from "./services/api.js";
import ImageGallery from "./components/imageGallery/ImageGallery.jsx";
import SearchBar from "./components/searchBar/SearchBar.jsx";
import LoadMoreBtn from "./components/loadMoreBtn/LoadMoreBtn.jsx";
import Loader from "./components/loader/Loader.jsx";
import ErrorMessage from "./components/errorMessage/ErrorMessage.jsx";
import ImageModal from "./components/imageModal/ImageModal.jsx";
import toast from "react-hot-toast";

function App() {
  const [gallery, setGallery] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [regularImage, setRegularImage] = useState();

  useEffect(() => {
    const abortController = new AbortController();
    const getImages = async () => {
      if (!query) return;
      try {
        setIsLoading(true);
        const data = await fetchGallery(query, page, abortController.signal);
        setGallery((prev) => [...prev, ...data.results]);
        setTotalPage(data.total_pages);
        if (data.total === 0) {
          return toast.error("Введіть інший текст для пошуку зображень");
        }
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getImages();
    return () => {
      abortController.abort();
    };
  }, [query, page]);

  const handleChangeQuery = (newQuery) => {
    setQuery(newQuery);
    setGallery([]);
    setPage(1);
  };
  const onClickLoadMore = () => {
    setPage(page + 1);
  };

  const openModal = (selectedUrl) => {
    setIsModalOpen(true);
    setRegularImage(selectedUrl);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setRegularImage(null);
  };
  return (
    <>
      <SearchBar query={query} handleChangeQuery={handleChangeQuery} />
      {gallery.length > 0 && (
        <ImageGallery gallery={gallery} openModal={openModal} />
      )}
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      {query.length > 0 && !isLoading && page < totalPage && (
        <LoadMoreBtn onClickLoadMore={onClickLoadMore} />
      )}
      {isModalOpen && (
        <ImageModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          regularImage={regularImage}
        />
      )}
    </>
  );
}

export default App;
