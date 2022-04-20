import "./dataTable.css";
import logo from "../../logoNavBar.jpg";
import { List, Grid, Segment, Image, Icon,Input } from "semantic-ui-react";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import AddProduct from "../products/AddProduct";

function DataTable({ list, uploadImg }) {
  const [imgFile, setImgFile] = useState();
  console.log("list", list);
  function onChange(e) {
    console.log(e.target.files);
    setImgFile(e.target.files[0]);
  }
  useEffect(() => {
    console.log("imgFile ", imgFile);
  }, [imgFile]);
  return (
    <div>
      {list &&
        list.length > 0 &&
        list.map((item) => {
          console.log(item);
          return (
            <>
              <Grid className="grid-table" key={nanoid()}>
                <Grid.Row>
                  <Grid.Column width="2">
                    <Segment.Inline className="productId">{`N ${item.id}`}</Segment.Inline>
                  </Grid.Column>

                  <Grid.Column width="3">
                    <Segment.Inline>
                      <Image
                        avatar
                        className="product-icon"
                        src={item.img[item.img.length - 1]?.imagePath || logo}
                      />
                    </Segment.Inline>
                  </Grid.Column>

                  <Grid.Column width="2">
                    <Segment.Inline>
                      <List.Header>{item.name} </List.Header>
                      <div className="price">
                        {item.price} {item.currency}
                      </div>
                    </Segment.Inline>
                  </Grid.Column>

                  <Grid.Column width="6">
                    <Segment.Inline>
                      <List.Content>
                        <Segment.Inline>{item.orderStatus}</Segment.Inline>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            uploadImg(imgFile, item.id);
                          }}
                        >
                          <label className="upload" htmlFor ="file-input">
                          <Icon className="iconUpload" name="images" />
                          </label>
                          <input
                            id = "file-input"
                            className="upload imgBtn"
                            type="file"
                            onChange={(e)=>onChange(e)}
                          ></input>
                         
                          <button type="submit" className="upload">
                          <Icon className="upload iconUpload" name="upload" />
                          </button>
                        </form>
                      </List.Content>
                    </Segment.Inline>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </>
          );
        })}
    </div>
  );
}

export default DataTable;
