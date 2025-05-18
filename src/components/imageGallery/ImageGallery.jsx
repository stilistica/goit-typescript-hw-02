import s from "./ImageGallery.module.css";
import ImageCard from "../imageCard/ImageCard.jsx";

function ImageGallery({ gallery, openModal }) {
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
