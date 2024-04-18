import "../styles/footer.css";
import { ContactUs } from "./ContactUs";
import { useEffect, useState } from "react";

function Footer({shouldOpen, shouldOpenCallback}) {
    const [openContactForm, setOpenContactForm] = useState(false);

    useEffect(() => {
        if (shouldOpen) setOpenContactForm(shouldOpen);
    }, [shouldOpen]);

    useEffect(() => {
        if (shouldOpenCallback && !openContactForm) shouldOpenCallback(false);
    }, [openContactForm]);

	return (<>
		<div className="footer">
            <div className="footer-pattern" />
            <ContactUs open={openContactForm} close={_ => setOpenContactForm(false)} />
            <div className="container">
                <div className="columns">
                    <div className="left">
                        <h1>Kasha Design</h1>
                    </div>
			        <div className="right">
                        <a href='#' className="item" rel="nofollow" onClick={e => {e.preventDefault();setOpenContactForm(true)}}>Contact Us</a>
                        <a target="_blank" href="https://www.instagram.com/ka.sha.design/" className="item">Instagram</a>
                        <a target="_blank" href="mailto:kamakshi7495@gmail.com" className="item">Email</a>
                    </div>
                </div>
            </div>
		</div>
	</>);
}
	
export default Footer;