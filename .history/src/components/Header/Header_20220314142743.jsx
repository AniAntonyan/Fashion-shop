
import { Menu, Segment } from "semantic-ui-react";
function Header(){
    return(
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
    )
}

export default Header;