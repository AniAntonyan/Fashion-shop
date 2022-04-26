import productImg from "../../img/img1.jpg";
import "./dataTable.css";
import { nanoid } from "nanoid";
import {
  Grid,
  Segment,
  List,
  Image,
  Pagination,
  Dropdown,
  Item,
} from "semantic-ui-react";
import "./dataTable.css";
import { useState, useEffect } from "react";

function DataTableForUsser({ list }) {
  const [productsByPage, setProductsByPage] = useState([]);
  const [imgFile, setImgFile] = useState();
  const [start, setStart] = useState(0);
  const [result, setResult] = useState([]);

  const pageDevider = 4;

  function onChange(e) {
    console.log(e.target.files);
    setImgFile(e.target.files[0]);
  }
  useEffect(() => {
    console.log(imgFile);
  }, [imgFile]);

  useEffect(() => {
    setProductsByPage(list.slice(start, start + pageDevider));
  }, [start, result]);

  useEffect(() => {
    if (list && list.length > 0) setResult(list);
  }, [list]);

  function goToPage(e, data) {
    setStart(data.activePage * pageDevider - pageDevider);
  }
  return (
    <>
      {productsByPage &&
        productsByPage.length > 0 &&
        productsByPage.map((item) => {
          return (
            <Grid className="grid-table" key={nanoid()}>
              <Grid.Row>
                <Grid.Column width="2">
                  <Segment.Inline>{item.id}</Segment.Inline>
                </Grid.Column>
                <Grid.Column width="5">
                  <Segment.Inline>
                    <Image
                      avatar
                      className="product-icon"
                      src={
                        item.product.img[item.product.img.length - 1]
                          ?.imagePath || productImg
                      }
                    />
                  </Segment.Inline>
                </Grid.Column>
                <Grid.Column width="3">
                  <Segment.Inline>
                    <List.Content>
                      <List.Header>{item.product.name} </List.Header>
                      {item.product.price}
                      {item.product.currency}
                    </List.Content>
                  </Segment.Inline>
                </Grid.Column>

                <Grid.Column width="5">
                  <Segment.Inline>
                    <Segment.Inline>{item.orderStatus}</Segment.Inline>
                  </Segment.Inline>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          );
        })}

      <div className="pagination-container">
        <Pagination
          defaultActivePage={1}
          secondary
          onPageChange={goToPage}
          totalPages={Math.ceil(list.length / pageDevider)}
        />
      </div>
    </>
  );
}

export default DataTableForUsser;
