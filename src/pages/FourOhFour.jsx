import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Helmet } from "react-helmet";

function FourOhFour() {
  return (<>
    <Header />
    <Helmet>
      <title>404 | Kasha Design</title>
    </Helmet>
		<div className="main-content 404">
      <div className="container">
        <h1>You seem lost</h1>
        <Link to="/">Lets go home</Link>
      </div>
    </div>
    <Footer />
  </>);
};

export default FourOhFour;