import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { getCMSContent } from "../common/cms";
import { HTMLContent } from "../components/HTMLContent";
import { DotPhoto } from "../components/DotPhoto";
import { BackToTop } from "../components/BackToTop";
import { Helmet } from "react-helmet";
import "../styles/about.css";

function About() {
	const [CONTENT, setContent] = useState({});
	useEffect(() => {
		const fetch = async () => {
			const response = await getCMSContent({name: 'content', cached: true});
			if (response) setContent(response);
		}
		fetch();
	}, []);
	return (<>
		<Header active="about"/>
		<Helmet>
			<title>About | Kasha Design</title>
			<meta property="og:title" content="About | Kasha Design" />
		</Helmet>
		<div className="main-content about">
			<div className="container">
				<h1>About</h1>
				<div className="columns">
					<div className="left">
						<DotPhoto photo={CONTENT?.about?.image} classes="about-img" containerClass="about-img-container" />
					</div>
					<div className="right">
						<HTMLContent content={CONTENT?.about?.text?.html} />
						<p>Kasha Studio is actually one person. It's a big scam.</p>
						{/* <p>"I am a serious architect. I’m not a clown"</p> */}
					</div>
				</div>
				<BackToTop />
			</div>
		</div>
		<Footer />
	</>);
};

export default About;