import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getCMSContent } from "../common/cms";
import "../styles/projects.css";
import { BackToTop } from "../components/BackToTop";
import { DotPhoto } from "../components/DotPhoto";
import Details from "../components/Details";
import { Helmet } from "react-helmet";

function Projects() {
	const [projects, setProjects] = useState([]);
	const [clicked, setClicked] = useState();
	const navigate = useNavigate();
	
	useEffect(() => {
		const fetch = async () => {
			const response = await getCMSContent({name: 'projects', cached: true});
			if (response) setProjects(response);
		}
		fetch();
	}, []);
	
	const intercept = (e, i, p) => {
		e.preventDefault();
		setClicked(i);
		setTimeout(_ => {
			navigate(`/projects/${p.url}/`, {state: {project: p}});
		}, 500);
	}
	
	return (<>
		<Header active="projects"/>
		<Helmet>
			<title>Projects | Kasha Design</title>
			<meta property="og:title" content="Projects | Kasha Design" />
		</Helmet>
		<div className="main-content projects">
			<div className="container">
				<h1>Projects</h1>
				{projects && projects.length > 0 ? <>
					{projects.sort((a,b) => ((b?.order || 0 ) - (a?.order || 0))).map((p, i) => (
						<a key={i} href={`/projects/${p.url}`} onClick={e => intercept(e, i, p)}>
							<div className="p-project">
								<DotPhoto 
									photo={p?.thumbnail}
									containerClass="project-thumb"
									classes={`image ${clicked === i ? 'loading' : ''}`}
									threshold={.2}
								/>
								<div className="project-info">
									<div className="title">{p?.title || 'Project Title'}</div>
									<Details details={p?.details} showLabels={false}/>
								</div>
							</div>
						</a>)
					)}
					<BackToTop />
				</> : 'Loading...'}
				
			</div>
		</div>
		<Footer />
	</>);
}

export default Projects;