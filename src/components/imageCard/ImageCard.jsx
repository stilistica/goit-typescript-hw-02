import s from "./ImageCard.module.css";

function ImageCard({ image, openModal }) {
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
