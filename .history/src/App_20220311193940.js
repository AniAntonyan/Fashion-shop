import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div>
        <Menu pointing secondary>
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="messages"
            active={activeItem === "messages"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="friends"
            active={activeItem === "friends"}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position="right">
            <Menu.Item
              name="logout"
              active={activeItem === "logout"}
              onClick={this.handleItemClick}
            />
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
