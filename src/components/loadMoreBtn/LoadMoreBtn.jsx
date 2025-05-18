import s from "./LoadMoreBtn.module.css";

function LoadMoreBtn({ onClickLoadMore }) {
  return (
    <button onClick={onClickLoadMore} className={s.btn}>
      Load More
    </button>
  );
}

export default LoadMoreBtn;
