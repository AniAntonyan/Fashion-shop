import { Table, Icon } from "semantic-ui-react";
import productImg from "../../img/img1.jpg";
import { List, Image, Button } from "semantic-ui-react";
import "./dataTable.css";

function DataTable({ list }) {
    
  console.log(list);
  return (
    <List divided verticalAlign="middle">
      {list && list.map((item) => {
        return (
          <List.Item>
            <List.Content floated="right">
              <Button>Add</Button>
            </List.Content>
            <Image
              avatar
              className="product-icon"
              src={item.product.img[0]?.imagePath || productImg}
            />
             <List.Content>  
             <List horizontal>
             
            <List.Content > {item.orderStatus} 
            </List.Content>
                </List>
               </List.Content> 
            
          </List.Item>
        );
      })}
    </List>
  );
}

export default DataTable;