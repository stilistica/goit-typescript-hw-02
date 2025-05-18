import s from "./Loader.module.css";
import PulseLoader from "react-spinners/PulseLoader";

function Loader() {
  return (
    <div className={s.loader}>
      <PulseLoader size={30} />
    </div>
  );
}

export default Loader;
