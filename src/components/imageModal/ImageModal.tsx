import s from "./ImageModal.module.css";
import Modal, {Styles} from "react-modal";
import React, {MouseEvent} from "react";

interface ImageModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  regularImage: string;
}

function ImageModal({ isModalOpen, closeModal, regularImage }: ImageModalProps) {
  const customStyles: Styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(74,74,74,0.75)",
    },
    content: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "transparent",
      border: "none",
      padding: 0,
      outline: "none",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    },
  };

  Modal.setAppElement("#root");

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Image Modal"
      ariaHideApp={false}
    >
      <div onClick={handleOverlayClick} className={s.divImage}>
        <img src={regularImage} alt="Large view" className={s.image} />
      </div>
    </Modal>
  );
}

export default ImageModal;
