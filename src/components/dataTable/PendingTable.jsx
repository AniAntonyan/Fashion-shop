import { nanoid } from "nanoid";
import { Grid, Segment, List, Image, Dropdown} from "semantic-ui-react";
import productImg from "../../img/img1.jpg";
import "./dataTable.css";

function PendingTable({ list, changeStatus}) {
  
  return (
    <>
      {list &&
        list.length > 0 &&
        list.map((item) => {
            console.log("item", item);
          return (
            <Grid className="grid-table" key={nanoid()}>
              <Grid.Row>
                <Grid.Column width="5">
                  <Segment.Inline>
                    <Image
                      avatar
                      className="product-icon"
                      src={item.product.img[0]?.imagePath || productImg}
                    />
                  </Segment.Inline>
                </Grid.Column>
                <Grid.Column width="6">
                  <Segment.Inline>
                    <List.Content>
                      <List.Header>{item.product.name} </List.Header>
                      {item.product.price}
                    </List.Content>
                  </Segment.Inline>
                </Grid.Column>
                <Grid.Column width="3">
                  <Segment.Inline>{item.orderStatus}</Segment.Inline>
                </Grid.Column>
                <Grid.Column width="2">
                  <Segment.Inline>

<Dropdown pointing = "top left" text = "Edit">
                    <Dropdown.Menu >
                      <Dropdown.Item
                        onClick={() => {
                          changeStatus("PENDING", item.id);
                        }}
                        text="Pending"
                        icon="plus"
                      />
                      <Dropdown.Item
                        onClick={() => {
                          changeStatus("SENT", item.id);
                        }}
                        text="Sent"
                        icon="calendar"
                      />
                      <Dropdown.Item
                        onClick={() => {
                          changeStatus("PAID", item.id);
                        }}
                        text="Paid"
                        icon="calendar"
                      />
                      <Dropdown.Item
                        onClick={() => {
                          changeStatus("DONE", item.id);
                        }}
                        text="Done"
                        icon="calendar"
                      />
                    </Dropdown.Menu>
                    </Dropdown>
                  </Segment.Inline>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          );
        })}
    </>
  );
}

export default PendingTable;
