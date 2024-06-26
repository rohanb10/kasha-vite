import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Details from "../components/Details";
import Gallery from "../components/Gallery";
import { getCMSContent } from "../common/cms";
import { BackToTop } from "../components/BackToTop";
import { HTMLContent } from "../components/HTMLContent";
import { DotPhoto } from "../components/DotPhoto";
import "../styles/project.css";
import { Helmet } from "react-helmet";

function Project() {
	const {url} = useParams();
	const navProps = useLocation();
	const prefetched = navProps?.state?.project;

	const [project, setProject] = useState({});
	const [description, setDiscription] = useState('');
	useEffect(() => {
		if (prefetched) setProject({
			title: prefetched?.title,
			details: {
				completion: prefetched?.details?.completion,
				location: prefetched?.details?.location,
				type: prefetched?.details?.type,
			}
		});
		const fetch = async () => {
			const response = await getCMSContent({name: 'project', payload: url, cached: false});
			if (response) setProject(response);
		}
		fetch();
	}, []);

	useEffect(() => {
		let seo_description = '' || project?.seo_description || project?.description?.text?.slice(0,256) || ''; 
		// let seo_description = '';
		setDiscription(seo_description);
		console.log(seo_description);
	}, [project])
	
	return (<>
		<Header active="project"/>
		<Helmet>
			<title>{project?.title ? `${project?.title} | Kasha Design` : 'Kasha Design'}</title>
			<meta property="og:title" content={project?.title ? `${project?.title} | Kasha Design` : 'Kasha Design'} />
			<meta property="og:image" content={project?.banner?.url} />
		</Helmet>
		{description?.length > 0 && <Helmet>
			<meta name="description" content={description}/>
			<meta name="og:description" content={description}/>
		</Helmet>}
		<div className="main-content project">
			<div className="container">
				<div className="title">{project?.title}</div>
				<div className="subtitle">{project?.subtitle}</div>

				<DotPhoto photo={project?.banner} containerClass="banner" />

				<Details details={project?.details} showIcons={false}/>
			</div>
			<div className="container">
				<HTMLContent classes="description" content={project?.description?.html} />

				<Gallery plans={project?.plans} photos={project?.photos} />

				<BackToTop />
			</div>
		</div>
		<Footer />
	</>);
};

export default Project;