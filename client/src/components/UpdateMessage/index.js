import React from "react";
import "./style.css";
import { Message, Transition } from "semantic-ui-react";

const UpdateMessage = (props) => {
  const { isVisible, favorite } = props.savedUpdate;
  return (
    <Transition.Group animation="fade" duration={100}>
      {isVisible && (
        <div className="message-container">
          <Message
            className="update-message"
            positive
            icon="heart"
            header="Book saved:"
            content={`${favorite.title} by ${favorite.authors}`}
          />
        </div>
      )}
    </Transition.Group>
  );
};

export default UpdateMessage;
