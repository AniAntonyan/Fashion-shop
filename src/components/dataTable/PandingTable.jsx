import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { Grid, Segment, List, Image, Dropdown, Popup } from "semantic-ui-react";
import logo from "../../logoNavBar.jpg";
import "./dataTable.css";

function PendingTable({ list, changeStatus, tabName }) {
  // const [result, setResult] = useState(list);

  // useEffect(() => {
  //   if (list && list.length > 0) setResult(list);
  // }, [list]);

  console.log("list", list);
  return (
    <>
      {list &&
        list.length > 0 &&
        list.map((item) => {
          console.log("item", item);
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
                    <Segment.Inline>
                      {tabName === "DONE" ? (
                        <Dropdown
                          pointing="top left"
                          text="Edit"
                          className="disabled"
                        >
                          <Dropdown.Menu className="doneTab ">
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
                      ) : (
                        <Dropdown pointing="top left" text="Edit">
                          <Dropdown.Menu className="doneTab ">
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
                      )}
                    </Segment.Inline>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              }
              />
          );
        })}
    </>
  );
}

export default PendingTable;
