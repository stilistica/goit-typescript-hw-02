import s from "./SearchBar.module.css";
import toast from "react-hot-toast";
import { MdImageSearch } from "react-icons/md";
import React, {FormEvent} from "react";

interface SearchBarProps {
  handleChangeQuery: (newQuery: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ handleChangeQuery })=> {
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const input = evt.currentTarget.elements.namedItem("query") as HTMLInputElement;
    const newQuery: string = input.value;
    if (newQuery.trim() === "") {
      toast.error("Необхідно ввести текст для пошуку зображень");
      evt.currentTarget.reset();
      return;
    }
    handleChangeQuery(newQuery);
    evt.currentTarget.reset();
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
