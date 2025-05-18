import s from "./SearchBar.module.css";
import toast from "react-hot-toast";
import { MdImageSearch } from "react-icons/md";

function SearchBar({ handleChangeQuery }) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const newQuery = evt.target.elements.query.value;
    if (newQuery.trim() === "") {
      toast.error("Необхідно ввести текст для пошуку зображень");
      evt.target.reset();
      return;
    }
    handleChangeQuery(newQuery);
    evt.target.reset();
  };
  return (
    <header className={s.header}>
      <form onSubmit={handleSubmit} className={s.form}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
        />
        <button type="submit">
          <MdImageSearch /> Search
        </button>
      </form>
    </header>
  );
}

export default SearchBar;
