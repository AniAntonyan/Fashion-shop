import { useEffect, useState } from "react";
import { Pagination } from "semantic-ui-react";
import { getProducts } from "../../services/api";
import CardItem from "./CardItem";
import "./cards.css";

const Cards = ({pageDevider, setResponseInfo}) => {
  const [result, setResult] = useState([]);
  const [productsByPage, setProductsByPage] = useState([]);
  const [start, setStart] = useState(0);
  
  useEffect(() => {
    (async function createPageinashion() {
      let data = await getProducts();
      setResult(data);
    })();
  }, []);

  useEffect(() => {
  setProductsByPage(result.slice(start, start + pageDevider));
}, [start, result]);

  function goToPage(e, data) {
    console.log(data.activePage);
    setStart(data.activePage * pageDevider - pageDevider);
  }
  
  return (
    <div className="ui stackable three column grid productItems">
      {productsByPage &&
        productsByPage.length > 0 &&
        productsByPage.map((item) => {
          return (
            <CardItem
        item={item}
          key={item.id}
          description={item?.description.comment || ""}
          image={item.img[item.img.length-1]}
          name={item.name}
          price={item.price}
            />
          );
        })}
      
      <div className="pagination-container">
        {result && result.length > pageDevider? 
        <Pagination
          defaultActivePage={1}
          secondary
          onPageChange={goToPage}
          totalPages={Math.ceil(result.length / pageDevider)}
        />:""
}
      </div>
    </div>
  );
};

export default Cards;