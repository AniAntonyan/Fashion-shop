import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { Grid, Segment, List, Image, Dropdown, Popup } from "semantic-ui-react";
import logo from "../../logoNavBar.jpg";
import "./dataTable.css";
import Paginations from "../pagination/Pagination";


function UserOrdersTable({list}){
  console.log("list tabsi hamar ", list);
  const [result, setResult] = useState([]);

  // function getProductsByPage(productsByPage){
  //   setProductsByPage(productsByPage)
  // }

  useEffect(() =>{
    if (list && list.length > 0) setResult(list)
  }, [list])

  return(
    <>
    {result &&
      result.length > 0 &&
      result.map((item) => {
        return (
            <Popup
            inverted
            content={new Date(item.date).toString()}
            key={item.name}
            header={item.user.name}
            className="tooltip"
            trigger={
              <Grid className="grid-table" key={nanoid()}>
              <Grid.Row>
                <Grid.Column width="3">
                  <Segment.Inline 
                  className="orderId">{`Order Number N ${item.id}`} 
                  </Segment.Inline>
                </Grid.Column>
                <Grid.Column width="3">
                  <Segment.Inline>
                    <Image
                      avatar
                      className="product-icon"
                      src={item.product.img[0]?.imagePath || logo}
                    />
                  </Segment.Inline>
                </Grid.Column>
                <Grid.Column width="4">
                  <Segment.Inline>
                    <List.Content>
                      <List.Header>{item.product.name} </List.Header>
                      {item.product.price} {item.address} {item.phone}
                    </List.Content>
                  </Segment.Inline>
                </Grid.Column>
                <Grid.Column width="3">
                  <Segment.Inline>{item.orderStatus}</Segment.Inline>
                </Grid.Column>
                <Grid.Column width="3">

                </Grid.Column>
              </Grid.Row>
            </Grid>
            }
            
            />   
        );     
      })}
       {/* <Paginations result={result} getProductsByPage={getProductsByPage}/> */}
  </>
  )
}

export default UserOrdersTable;