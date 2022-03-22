import { Card, Icon, Image } from 'semantic-ui-react'
import "./cardItem.css";

function CardItem({description, image, name, price}){
    return (
        <Card centered>
          <Image src={image} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Meta>
              <span className='date'>Joined in 2015</span>
            </Card.Meta>
            <Card.Description>
              {description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
          {price}
            {/* <a>
              <Icon name='user' />
              22 Friends
            </a> */}
          </Card.Content>
        </Card>
      )
}

export default CardItem;