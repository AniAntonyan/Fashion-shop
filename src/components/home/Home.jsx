import Cards from "../card/Cards";
import "../home/home.css";
import Slides from "../slider/Slides";
import { useAuth0 } from "@auth0/auth0-react";


const Home = () => {
    const {user, isAuthenticated} = useAuth0();

    return (
        <div className="home main">
            <Slides />
           <Cards />
        </div>
    );
}

export default Home;
