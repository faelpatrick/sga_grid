import React from "react";
import ".//styles.css";
import Logo from "../images/logo.png";

const Home = () => {
  const handleMenu = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("sidebar--active");
  };

  return (
    <div className="container">
      <header className="header" id="header">
        <div className="header__menuIcon" onClick={handleMenu}></div>
        <div className="header__title">
          <img src={Logo} alt="" className="sidebar__logo--img" />
        </div>
        <div className="header__options">SAIR</div>
      </header>
      <div className="sidebar " id="sidebar">
        <div className="sidebar_header">
          <div className="sidebar__logo">
            <img src={Logo} alt="" className="sidebar__logo--img" />
          </div>
          <div className="sidebar__menuIcon" onClick={handleMenu}>
            <i className="fa-thin fa-bars"></i>
          </div>
        </div>
        <nav className="sidebar__nav" id="nav">
          <ul>
            <li className="nav__link nav__link--active">Home</li>
            <li className="nav__link">Cursos</li>
            <li className="nav__link">Disciplinas</li>
            <li className="nav__link">Professores</li>
            <li className="nav__link">Alunos</li>
          </ul>
        </nav>
      </div>
      <div className="content" id="content">
        Conteudo
      </div>
    </div>
  );
};

export default Home;
