import s from "./ImageGallery.module.css";
import ImageCard from "../imageCard/ImageCard"
import {GalleryItem} from "../App/App";

interface ImageGalleryProps {
  gallery: GalleryItem[];
  openModal: (selectedUrl: string) => void;
}
function ImageGallery({ gallery, openModal }: ImageGalleryProps) {
  return (
    <ul className={s.galleryList}>
      {gallery.map((image) => (
        <li key={image.id}>
          <ImageCard image={image} openModal={openModal} />
        </li>
      ))}
    </ul>
  );
}

export default ImageGallery;
