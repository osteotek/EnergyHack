/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const Navbar = () => (
  <div
    className="sidebar"
    data-color="orange"
    data-image="assets/img/inno_logo.jpg"
  >
    <div className="sidebar-wrapper">
      <div className="logo">
        <a href="#" className="simple-text">
          EnergyHack Kazan
        </a>
      </div>

      <ul className="nav">
        <li className="active">
          <a href="#">
            <i className="pe-7s-science" />
            <p>Панель пользователя</p>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="pe-7s-user" />
            <p>Профиль</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
);

export default Navbar;
