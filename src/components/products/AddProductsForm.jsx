import {
  Form,
  Input,
  Label,
  TextArea
} from "semantic-ui-react";

function AddProductsForm({changeOptions}) {

    function handleChange(event){
            changeOptions({[event.target.name]:event.target.value});
    }

  return (
    <div>
        <h4>Add New Product</h4>
      <Form>
        <Form.Field
          name="productName"
          control={Input}
          label="Product Name"
          placeholder="productName"
          onChange = {(e)=>handleChange(e)}
        />
        <Form.Field
          name="productPrice"
          control={Input}
          type="number"
          label="Product Price"
          placeholder="0.0"
          onChange = {(e)=>handleChange(e)}
        />
        <Form.Field
          name="productDescription"
          control={TextArea}
          label="Product Description"
          placeholder="productDescription"
          onChange = {(e)=>handleChange(e)}
        />
        <Form.Field
          name="productCount"
          control={Input}
          type="number"
          label="Product Count"
          placeholder="productCount"
          onChange = {(e)=>handleChange(e)}
        />
      </Form>
    </div>
  );
}
export default AddProductsForm;

