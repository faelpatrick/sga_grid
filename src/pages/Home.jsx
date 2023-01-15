import React from 'react';
import LogoDesktop from '../images/banner_home.jpg';
import LogoMobile from '../images/banner_home_mobile.jpg';

const Home = () => {
	return (
		<div className="home_content">
			<img className="home_img--Desktop" src={LogoDesktop} alt="Logo UNICRUD Desktop" />
			<img className="home_img--Mobile" src={LogoMobile} alt="Logo UNICRUD Mobile" />
			<h3>
				Desenvolvido por: <a href="http://rafaelpatrick.com.br/">Rafael Patrick de Souza</a>
			</h3>
		</div>
	);
};

export default Home;
