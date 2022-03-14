import { createMedia } from "@artsy/fresnel";
import { Menu, Segment } from "semantic-ui-react";
import { render } from "react-dom";
import { Container, Icon, Image, Menu, Sidebar } from "semantic-ui-react";


function Header(){
    return(
        <div>
        {/* <Menu stackable>
          <Menu.Item name="home" active={true} />
          <Menu.Item name="products" active={false} />
          <Menu.Item name="review" active={false} />
          <Menu.Menu position="right">
            <Menu.Item name="login" active={false} />
          </Menu.Menu>
        </Menu>

      
//       </div>
//     )
// }

export default Header;