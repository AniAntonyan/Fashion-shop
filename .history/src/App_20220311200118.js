import logo from "./logo.svg";
import "./App.css";
import { Menu, Segment } from "semantic-ui-react";

function App() {
  return (
    <div className="App">
      <div>
        <Menu inverted>
          <Menu.Item name="home" active={true} />
          <Menu.Item name="messages" active={false} />
          <Menu.Item name="friends" active={false} />
          <Menu.Menu position="right">
            <Menu.Item name="logout" active={false} />
          </Menu.Menu>
        </Menu>

        <Segment>
          <img src="/images/wireframe/media-paragraph.png" />
        </Segment>
      </div>
    </div>
  );
}

export default App;
