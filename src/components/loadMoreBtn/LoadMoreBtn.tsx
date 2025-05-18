import s from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
    onClickLoadMore: () => void;
}

function LoadMoreBtn({ onClickLoadMore }: LoadMoreBtnProps) {
  return (
    <button onClick={onClickLoadMore} className={s.btn}>
      Load More
    </button>
  );
}

export default LoadMoreBtn;
