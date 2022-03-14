import { createMedia } from "@artsy/fresnel";
import { Menu, Segment } from "semantic-ui-react";
import { render } from "react-dom";
import { Container, Icon, Image, Menu, Sidebar } from "semantic-ui-react";


function Header(){

  const AppMedia = createMedia({
    breakpoints: {
      mobile: 320,
      tablet: 768,
      computer: 992,
      largeScreen: 1200,
      widescreen: 1920
    }
  });
  const mediaStyles = AppMedia.createMediaStyle();
  const { Media, MediaContextProvider } = AppMedia;
  
  const NavBarMobile = (props) => {
    const {
      children,
      leftItems,
      onPusherClick,
      onToggle,
      rightItems,
      visible
    } = props;
  
    return(
        <div>

        {/* <Menu stackable>
          <Menu.Item name="home" active={true} />
          <Menu.Item name="products" active={false} />
          <Menu.Item name="review" active={false} />
          <Menu.Menu position="right">
            <Menu.Item name="login" active={false} />
          </Menu.Menu>
        </Menu>*/

      
      </div>
    )
}

export default Header;