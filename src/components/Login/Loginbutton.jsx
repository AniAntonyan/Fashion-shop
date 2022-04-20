import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { authoriseUser } from "../../Services/api";
import { Button, Message } from "semantic-ui-react";
import "./loginButton.css";

function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  return (
    <div style={{ paddingTop: "100px" }}>
      
      <Button positive onClick={() => loginWithRedirect()}>Log In</Button>
      {/* <Message className="massage-login" content='Please Subscribe up to  buy a product' /> */}
      <Message className="massage-login" color='green'>Please Subscribe if you want to  buy a product</Message>
    </div>
  );
}

function LoginPage() {
  return (
    <div style={{ paddingTop: "100px" }}>
      {<LoginButton />}
    </div>
  );
}
export default LoginPage;
