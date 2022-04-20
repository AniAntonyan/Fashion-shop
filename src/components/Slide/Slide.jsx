import { useState } from "react";
import "./slide.css";
import {Button, Icon} from "semantic-ui-react";

function Slides({ slides }) {

  let [index, setIndex] = useState(0);
  // let encodeed = slides[0].image;
  // console.log("encodeed", encodeed)

  function showPrev(){

     (index !== 0) ? setIndex(--index) : setIndex(slides.length-1);
     console.log(" i em prev index", index)

  }

  function showNext(){

    (index !== slides.length-1) ? setIndex(++index) : setIndex(0);
    console.log(" i am next index", index)

   }

   function restart(){
     
    setIndex(0);
    console.log("Restart ", index);

   }

  return (
    <div>
      {/* <div id="navigation" className="text-center"> */}
        <div id="slide" className="card text-center">
          <div className="slideImg"><img src={slides[index].image} data-testid="title"/>

          </div>
             <Button data-testid="button-prev" className="small left" onClick={()=>{
                showPrev()
              }}>
              <Icon name = "angle left" size='huge' />
              </Button>

              <Button data-testid="button-next" className="small right" onClick={()=>{
                showNext()
              }}>
              <Icon name = "angle right" size='huge'/>
              
              </Button>
      </div>
       
        {/* <p data-testid="text">Slide Text Here</p> */}
      </div>
    // </div>
  );
}

export default Slides;

