import "./App.css";
import { useEffect, useState } from "react";
import { fetchGallery } from "../../services/api.js";
import ImageGallery from "../imageGallery/ImageGallery.js";
import SearchBar from "../searchBar/SearchBar.js";
import LoadMoreBtn from "../loadMoreBtn/LoadMoreBtn.js";
import Loader from "../loader/Loader.js";
import ErrorMessage from "../errorMessage/ErrorMessage.js";
import ImageModal from "../imageModal/ImageModal.js";
import toast from "react-hot-toast";

export interface GalleryItem {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  }
}
export interface Data {
  results: GalleryItem[];
  total: number;
  total_pages: number;
}
function App() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [regularImage, setRegularImage] = useState<string>('');

  useEffect(() => {
    const abortController = new AbortController();
    const getImages = async () => {
      if (!query) return;
      try {
        setIsError(false);
        setIsLoading(true);
        const data: Data = await fetchGallery({query, page, signal: abortController.signal});
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

  const handleChangeQuery = (newQuery: string): void => {
    setQuery(newQuery);
    setGallery([]);
    setPage(1);
  };
  const onClickLoadMore = (): void => {
    setPage(prev => prev + 1);
  };

  const openModal = (selectedUrl: string): void => {
    setIsModalOpen(true);
    setRegularImage(selectedUrl);
  };
  const closeModal = (): void => {
    setIsModalOpen(false);
    setRegularImage("");
  };
  return (
    <>
      <SearchBar handleChangeQuery={handleChangeQuery} />
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
