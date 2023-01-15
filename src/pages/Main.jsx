import React, { useState } from 'react';
import './/styles.css';
import Logo from '../images/logo.png';
import Home from './Home';
import Curso from './Cursos';
import Disciplinas from './Disciplinas';
import Professores from './Professores';
import Alunos from './Alunos';

const Main = () => {
	const handleContent = (page, menuActive) => {
		document.querySelectorAll('.nav__link--active').forEach((e) => e.classList.toggle('nav__link--active'));
		menuActive.target.classList.toggle('nav__link--active');
		setContent(page);
		handleMenu();
	};

	const handleMenu = () => {
		const sidebar = document.querySelector('.sidebar');
		sidebar.classList.toggle('sidebar--active');
	};

	const showModal = (Page) => {
		setModalContent(Page);
		document.querySelector('.modal').classList.toggle('display_none');
	};

	const closeModal = () => {
		document.querySelector('.modal').classList.add('display_none');
	};

	const [Content, setContent] = useState(<Professores closeModal={closeModal} showModal={showModal} />);
	const [modalContent, setModalContent] = useState();

	return (
		<div className="container">
			<header className="header" id="header">
				<div className="header__menuIcon" onClick={handleMenu}></div>
				<div className="header__title">
					<img src={Logo} alt="" className="sidebar__logo--img" />
				</div>
				<div className="header__options">
					<div className="header__options--out">Sair</div>
				</div>
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
						<li
							className="nav__link nav__link--active "
							onClick={(l) => handleContent(<Home closeModal={closeModal} showModal={showModal} />, l)}
						>
							Home
						</li>
						<li
							className="nav__link"
							onClick={(l) => handleContent(<Curso closeModal={closeModal} showModal={showModal} />, l)}
						>
							Cursos
						</li>
						<li
							className="nav__link"
							onClick={(l) =>
								handleContent(<Disciplinas closeModal={closeModal} showModal={showModal} />, l)
							}
						>
							Disciplinas
						</li>
						<li
							className="nav__link"
							onClick={(l) =>
								handleContent(<Professores closeModal={closeModal} showModal={showModal} />, l)
							}
						>
							Professores
						</li>
						<li
							className="nav__link"
							onClick={(l) => handleContent(<Alunos closeModal={closeModal} showModal={showModal} />, l)}
						>
							Alunos
						</li>
					</ul>
				</nav>
			</div>
			<div className="content" id="content">
				{Content}
				<div id="modal" className="modal display_none">
					<div className="modal__conteudo">
						<button className="modal__close" onClick={() => closeModal()}>
							Fechar
						</button>
						{modalContent}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Main;
