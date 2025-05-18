import s from "./ErrorMessage.module.css";

function ErrorMessage() {
  return <p className={s.err}>УПС.. Сервер не відповідає, спробуйте пізніше</p>;
}

export default ErrorMessage;
