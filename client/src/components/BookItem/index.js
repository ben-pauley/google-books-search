import React from "react";
import { Item, Icon, Button, Label } from "semantic-ui-react";
import { useStoreContext } from "../../utils/GlobalState";

const BookItem = (props) => {
  const [state, dispatch] = useStoreContext();
  const {
    title,
    authors,
    description,
    src,
    link,
    handleSave,
    bookId,
    deleteBtn,
    handleDelete,
  } = props;

  return (
    <Item>
      <Item.Image size="tiny" src={src} as="a" href={link} target="_blank" />
      <Item.Content verticalAlign="middle">
        <div>
          <Item.Header
            className="item-header"
            style={{ fontSize: "1.3rem", fontWeight: 700, color: "black" }}
          >
            {title}
            <Button as="div" labelPosition="left" floated="right">
              <Label basic as="a" href={link} target="blank">
                View
              </Label>
              {deleteBtn ? (
                <Button
                  loading={state.loading}
                  icon
                  onClick={() => handleDelete(bookId)}
                  className="negative ui button"
                >
                  <Icon name="delete" />
                  Delete
                </Button>
              ) : (
                <Button
                  loading={state.loading}
                  icon
                  onClick={() => handleSave(bookId)}
                  className="positive ui button"
                >
                  Save <Icon name="heart" />
                </Button>
              )}
            </Button>
          </Item.Header>
        </div>
        <Item.Meta>Written by {authors}</Item.Meta>
        <Item.Description>{description}</Item.Description>
      </Item.Content>
    </Item>
  );
};

export default BookItem;
