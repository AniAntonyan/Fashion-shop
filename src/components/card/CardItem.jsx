import { Card, Image, Button } from "semantic-ui-react";
import "./cardItem.css";
import BuyProduct from "../buyProduct/BuyProduct";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import productImg from "../../img/img1.jpg";

function CardItem({ description, image, name, price, item }) {
  const { isAuthenticated, user } = useAuth0();
  return (
    <Card centered>
        <Image src={image?image.imagePath: productImg} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Description>{description} </Card.Description>
      </Card.Content>

      <Card.Content extra className="buy-info">
        {price}
        {isAuthenticated ? (
          <BuyProduct
            item={item}
            productInfo={{ description, image, name, price }}
          />
        ) : (
          <Button as={Link} to="/login" color="green" inverted floated="right">
            BUY
          </Button>
        )} 
        
      </Card.Content>
    </Card>
  );
}
 export default CardItem;