import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Container, Button } from "semantic-ui-react";
import { useStoreContext } from "../../utils/GlobalState";

function Nav(props) {
  const [state, dispatch] = useStoreContext();

  const handleClick = () => {
    dispatch({ type: "CLEAR_SEARCH" });
  };

  return (
    <Container>
      <Menu tabular>
        <Menu.Item
          as={NavLink}
          to="/search"
          name="Search for books"
          active={props.location === "search"}
        />
        <Menu.Item
          as={NavLink}
          to="/saved"
          name="View saved books"
          active={props.location === "saved"}
        />
        {state.books.length > 0 && (
          <Menu.Item position="right">
            <Button basic icon onClick={handleClick}>
              Clear search
            </Button>
          </Menu.Item>
        )}
      </Menu>
    </Container>
  );
}

export default Nav;
