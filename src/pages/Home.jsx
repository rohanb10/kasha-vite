import Header from "../components/Header";
import "../styles/home.css";
import hero_desktop from "../assets/images/hero-desktop.jpg";
import hero_mobile from "../assets/images/hero-mobile.jpg";
import Footer from "../components/Footer";
import How from "../components/How";
import { useEffect, useState } from "react";
import { getCMSContent } from "../common/cms";
import { fallbackContent } from "../common/fallback";
import { BackToTop } from "../components/BackToTop";
import { HTMLContent } from "../components/HTMLContent";
import { Tiles } from "../components/Tiles";
import { DotPhoto } from "../components/DotPhoto";
import { Helmet } from "react-helmet";

function Home() {
	const [CONTENT, setContent] = useState();
	const [openContactForm, setOpenContactForm] = useState(false);
	useEffect(() => {
		const fetch = async () => {
			const response = await getCMSContent({name: 'content', cached: true});
			if (response) setContent(response);
		}
		fetch();
	}, [])
	return (<>
		<Header active="home"/>
		<Helmet>
			{CONTENT?.home?.hero?.url && <meta property="og:image" content={CONTENT?.home?.hero?.url} />}
		</Helmet>
		<div className="main-content home">
			<div className="hero">
				<div className="container">
					<DotPhoto photo={CONTENT?.home?.hero} containerClass="hero-img" />
					<h1 className="kasha-primary">Kasha Design</h1>
					<div className="hero-actions">
						<a href="/projects/" className="hero-action">See our work</a>
						<a href="#" className="hero-action" rel="nofollow" onClick={_ => setOpenContactForm(true)}>Get in touch</a>
					</div>
				</div>
			</div>
			<div className="container">
				<h2>What we do</h2>
				<HTMLContent content={CONTENT?.home?.what?.html} />
			</div>
			<div className="container">
				<h2>How we work</h2>
				<How content={CONTENT?.home?.how}/>

				<h2>Who we are</h2>
				<HTMLContent content={CONTENT?.home?.who?.html} />

				<h2>Follow us on Instagram</h2>
				<HTMLContent content={CONTENT?.home?.insta_text?.html} />
				<Tiles photos={CONTENT?.home?.insta} handle={CONTENT?.home?.insta_handle} />
				<BackToTop />
			</div>
		</div>
		<Footer shouldOpen={openContactForm} shouldOpenCallback={setOpenContactForm}/>
	</>);
}

export default Home;