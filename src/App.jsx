import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Project from "./pages/Project";
import About from "./pages/About";
import FourOhFour from "./pages/FourOhFour";
import './styles/app.css';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/projects/" element={<Projects />} />
				<Route path="/projects/:url/" element={<Project />} />
				<Route path="/about/" element={<About />} />
				<Route path="*" element={<FourOhFour />} />
			</Routes>
		</BrowserRouter>
	);
}