import { Label } from "semantic-ui-react";
import Cards from "../card/Cards";
import Slides from "../Slide/Slide";
import secondSlideData from "../../Services/secondSlideData"




function Products() {
  return (
    <div className="home main ui container">
   
      <Slides slides={secondSlideData()}/>
      <Cards />
    </div>
  );
}
export default Products;
