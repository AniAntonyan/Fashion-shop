import React, { useState } from "react";
import { Button, Form, Header, Image, Modal, Segment } from "semantic-ui-react";
import { useAuth0 } from "@auth0/auth0-react";
import AddProductForm from "./AddProductForm";
import { confirmAddProduct } from "../../services/api";

function AddProduct({setResponseInfo}) {
  
  const { error, isAuthenticated, isLoading, user, getAccessTokenSilently } =
    useAuth0();
  const [open, setOpen] = useState(false);
  const initFormData = {
    productName: "",
    productPrice: "",
    productCurrency: "AMD",
    productDescription: "",
    productCount: "",
  };
  const [options, setOptions] = useState(initFormData);
  

  function changeOptions(prop) {
    setOptions({ ...options, ...prop });
  }
  async function confirmProduct(userId) {
    try {
      const token = await getAccessTokenSilently();

      const productObj = {
        name: options.productName,
        price: options.productPrice,
        currency: options.productCurrency,
        description: {
          comment: options.productDescription,
        },
        stock: {
          isAvailable: true,
          count: options.productCount,
        },
      };

      const orderStatus = await confirmAddProduct(productObj, userId, token);
      if (orderStatus.httpStatus && orderStatus.httpStatus === "OK") {
        setResponseInfo(orderStatus.message);
      }
      console.log(orderStatus);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal
      className="custom-modal"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color="green">Add New Product</Button>}
    >
      <Modal.Content>
        <AddProductForm changeOptions={changeOptions} />
      </Modal.Content>
      <Modal.Actions>
        <Segment>
          <Segment.Inline>
            <Button color="black" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
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
