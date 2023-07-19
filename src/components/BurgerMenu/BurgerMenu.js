import "./BurgerMenu.css";
import { NavLink, Link } from "react-router-dom";

const BurgerMenu = ({ onClose, isOpen }) => {
  const popupIsOpen = isOpen ? "burger_is-active" : "";

  return (
    <div className={`burger ${popupIsOpen}`}>
      <div className="burger__backdrop">
        <div className="burger__container">
          <button type="button" className="burger__close" onClick={onClose} />
          <div className="burger__menu">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `burger__link ${isActive ? "burger__link_active" : ""}`
              }
            >
              Главная
            </NavLink>
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                `burger__link ${isActive ? "burger__link_active" : ""}`
              }
            >
              Фильмы
            </NavLink>
            <NavLink
              to="/saved-movies"
              className={({ isActive }) =>
                `burger__link ${isActive ? "burger__link_active" : ""}`
              }
            >
              Сохранённые фильмы
            </NavLink>
          </div>
          <Link to="/profile">
            <button className="burger__button_account" type="button">
              Аккаунт
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;

// BurgerMenu — компонент, для отображинии навигации на не больших разрешениях экрана.
