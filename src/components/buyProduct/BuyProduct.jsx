import React, { useEffect, useState } from "react";
import { Button, Header, Image, Modal, Segment } from "semantic-ui-react";
import BuyForm from "./BuyForm";
import "./BuyProduct.css";
import { confirmOrder } from "../../services/api";
import { useAuth0 } from "@auth0/auth0-react";
import img6 from "../../img/img6.jpg";

function BuyProduct({ productInfo, item }) {
  const { user, getAccessTokenSilently } =
    useAuth0();

  const { description, image, name, price } = productInfo;
  const [open, setOpen] = useState(false);
  const inintFormData = { address: "", phone: "", paymentMethod: "cash" };
  const [options, setOptions] = useState(inintFormData);
  const [disable, setDisable] = useState(true);

  async function confirmAction() {
    try {
      const token = await getAccessTokenSilently();
      const userObj = {
        id: user.sub,
        email: user.email,
        name: user.name,
        picture: user.picture,
      };
      const orderStatus = await confirmOrder(userObj, item, token, options);
      console.log(orderStatus);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (open === false) {
      resetOptions();
    }
    console.log("disable", disable);
    let status = false;
    for (let key in options) {
      if (!options[key] && key !== "paymentMethod") {
        status = true;
      }
    }

    setDisable(status);
  }, [options, open]);
  function resetOptions() {
    for (let key in options) {
      if (key != "paymentMethod") {
        options[key] = "";
      }
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
        <Button color="green" inverted floated="right">
          BUY
        </Button>
      }
    >
      <Modal.Content image>
        <Image
          size="medium"
          src= {image?image.imagePath: img6} 
        />

        <Modal.Description>
          <Header>{name}</Header>
          <p>{description}</p>
          <p>{price + "AMD"}</p>
        </Modal.Description>
        <BuyForm userName={user.name} changeOptions={changeOptions} />
      </Modal.Content>
      <Modal.Actions>
        <Segment>
          <Segment.Inline>
            <Button color="black" onClick={() => setOpen(false)}>
              Nope
            </Button>
            <Button
              content="Confirm"
              disabled={disable}
              labelPosition="right"
              icon="checkmark"
              onClick={() => {
                setOpen(false);

                confirmAction();
              }}
              positive
            />
          </Segment.Inline>
        </Segment>
      </Modal.Actions>
    </Modal>
  );
}
export default BuyProduct;
