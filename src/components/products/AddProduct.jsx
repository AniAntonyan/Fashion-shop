import React, { useState } from "react";
import { Button, Form, Header, Image, Modal, Segment } from "semantic-ui-react";
// import BuyForm from "./BuyForm";
import AddProductsForm from "./AddProductsForm";
import { useAuth0 } from "@auth0/auth0-react";
import { confirmAddProduct } from "../../Services/api";

function AddProduct({setResponseInfo}) {
    const { error, isAuthenticated, isLoading, user, getAccessTokenSilently } =
      useAuth0();
  
    // const { description, image, name, price } = productInfo;

    const [open, setOpen] = useState(false);
    const initFormData = {
        productName: "",
        productPrice: "", 
        productCurrency: "AMD",
        productDescription: "", 
        productCount: ""
    };
    const [options, setOptions] = useState(initFormData);
  
    async function confirmProduct() {
        try {
          const token = await getAccessTokenSilently();
          console.log("options",options);

          const productObj = {
            name: options.productName,
            price: options.productPrice,
            currency: options.productCurrency,
            description:{
                comment:options.productDescription,
            },
            stock:{
                isAvailable:true,
                count:options.productCount
            }
          };
     
          const orderStatus = await confirmAddProduct(productObj, user.sub, token);
          if (orderStatus.httpStatus && orderStatus.httpStatus === "OK") {
            setResponseInfo(orderStatus.message);
          }
        } catch (error) {
          console.log(error);
        }
      }
    function changeOptions(prop) {
        setOptions({ ...options, ...prop });
      }
    
    return (
      <Modal
        className="custom-modal"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <Button className="buyBtn"  inverted >
            Add New Product
          </Button>
        }
      >
        <Modal.Content >
       <AddProductsForm changeOptions={changeOptions}/>
        </Modal.Content>
        
        <Modal.Actions>
          <Segment>
            <Segment.Inline>
              <Button  onClick={() => setOpen(false)}>
                Nope
              </Button>
              <Button 
                className="buyBtn"
                content="Confirm"
                labelPosition="right"
                icon="checkmark"
                onClick={() => {
                  setOpen(false);
                  confirmProduct(user.sub);

                }}
                positive
              />
            </Segment.Inline>
          </Segment>
        </Modal.Actions>
      </Modal>
    );
  }
  
  export default AddProduct;
  