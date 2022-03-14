// import { createMedia } from "@artsy/fresnel";
// import { Menu, Segment } from "semantic-ui-react";
import React from "react";
import { Container, Icon, Image, Menu, Sidebar } from "semantic-ui-react";




  const AppMedia = createMedia({
    breakpoints: {
      mobile: 320,
      tablet: 768,
      computer: 992,
      largeScreen: 1200,
      widescreen: 1920
    }
  });
  
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
  
    return (
      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          items={leftItems}
          vertical
          visible={visible}
        />
        <Sidebar.Pusher
          dimmed={visible}
          onClick={onPusherClick}
          style={{ minHeight: "100vh" }}
        >
          <Menu fixed="top" inverted>
            <Menu.Item>
              {/* <Image size="mini" src="https://react.semantic-ui.com/logo.png" /> */}
            </Menu.Item>
            <Menu.Item onClick={onToggle}>
              <Icon name="sidebar" />
            </Menu.Item>
            <Menu.Menu position="right">
              {rightItems.map((item) => (
                <Menu.Item {...item} />
              ))}
            </Menu.Menu>
          </Menu>
          {children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  };
  
  const NavBarDesktop = (props) => {
    const { leftItems, rightItems } = props;
  
    return (
      <Menu fixed="top" inverted>
        <Menu.Item>
          {/* <Image size="mini" src="https://react.semantic-ui.com/logo.png" /> */}
        </Menu.Item>
  
        {leftItems.map((item) => (
          <Menu.Item {...item} />
        ))}
  
        <Menu.Menu position="right">
          {rightItems.map((item) => (
            <Menu.Item {...item} />
          ))}
        </Menu.Menu>
      </Menu>
    );
  };
  
  class NavBar extends React.Component {
    state = {
      visible: false
    };
  
    handlePusher = () => {
      const { visible } = this.state;
  
      if (visible) this.setState({ visible: false });
    };
  
    handleToggle = () => this.setState({ visible: !this.state.visible });
  
    render() {
      const { leftItems, rightItems } = this.props;
      const { visible } = this.state;
  
      return (
        <div>
          <Media at="mobile">
            <NavBarMobile
              leftItems={leftItems}
              onPusherClick={this.handlePusher}
              onToggle={this.handleToggle}
              rightItems={rightItems}
              visible={visible}
            >
            </NavBarMobile>
          </Media>
  
          <Media greaterThan="mobile">
            <NavBarDesktop leftItems={leftItems} rightItems={rightItems} />
            
          </Media>
        </div>
      );
    }
  }
  
  const leftItems = [
    { as: "a", content: "Home", key: "home" },
    { as: "a", content: "Products", key: "products" },
    { as: "a", content: "Review", key: "review" }
  ];
  const rightItems = [
    { as: "a", content: "Login", key: "login" },
    { as: "a", content: "Register", key: "register" }
  ];
  
  function Header(){
    return()
      <MediaContextProvider>
        <NavBar leftItems={leftItems} rightItems={rightItems}>
          {/* <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" /> */}
        </NavBar>
      </MediaContextProvider>
   
    )
}

export default Header;