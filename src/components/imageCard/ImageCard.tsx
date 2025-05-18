import s from "./ImageCard.module.css";
import {GalleryItem} from "../App/App";

interface ImageCardProps {
    image: GalleryItem;
    openModal: (selectedUrl:string) => void;
}
function ImageCard({ image, openModal }: ImageCardProps) {
  return (
    <div className={s.card}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        onClick={() => openModal(image.urls.regular)}
      />
    </div>
  );
}

export default ImageCard;
