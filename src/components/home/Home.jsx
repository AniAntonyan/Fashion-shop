import Cards from "../card/Cards";
import Slide from "../Slide/Slide"
import slidesData from "../../Services/slideData";
import "../home/home.css"

function Home(){
    return (
       <div className="home main ui container">
            <Slide slides={slidesData()}/>
            <Cards />
       </div>
    )
}
export default Home;