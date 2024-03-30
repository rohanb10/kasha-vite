import { Link } from "react-router-dom";
import "../styles/header.css";
import icon from "../assets/icons/kasha-logo.png";
import { useEffect } from "react";
import ScrollToTop from "./ScrollToTop";

function Header({active}) {

	useEffect(() => {

	}, [])

	return (<>
		<div className="navbar">
			<div className="navbar-container container">
				<div className={`navbar-brand ${active === 'home' ? 'active' : ''}`}>
					<a href="/">
						<img src={icon} alt="Logo" />
						{/* <span>Kasha Design</span> */}
					</a>
				</div>
				<div className="navbar-links">
					<a className={active === 'projects' ? 'active' : ''} href="/projects/">Projects</a>
					<a className={active === 'about' ? 'active' : ''} href="/about/">About</a>
				</div>
			</div>
		</div>
		<ScrollToTop />
	</>);
}
	
export default Header;