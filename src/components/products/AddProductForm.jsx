import { Form, Input, TextArea } from "semantic-ui-react";

function AddProductForm({changeOptions}) {
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
          label="Name"
          placeholder="name"
          onChange = {(e)=>handleChange(e)}
        />
        <Form.Field
          name="productPrice"
          control={Input}
          type="number"
          label="Price"
          placeholder="0.0"
          onChange = {(e)=>handleChange(e)}
        />
        <Form.Field
          name="productDescription"
          control={TextArea}
          label="Description"
          placeholder="description"
          onChange = {(e)=>handleChange(e)}
        />
        <Form.Field
          name="productCount"
          control={Input}
          type="number"
          label="Count"
          placeholder="count"
          onChange = {(e)=>handleChange(e)}
        />
      </Form>
    </div>
  );
}

export default AddProductForm;