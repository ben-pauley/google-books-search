import React from "react";
import "./style.css";
import { Header } from "semantic-ui-react";
import header from "../../images/header.svg";

const PageHeader = () => {
  return (
    <Header as="h1" icon textAlign="center" className="page-header">
      <div>
        <img src={header} height={250} alt="header" />
      </div>
      Google Books Search
      <Header.Subheader>
        Search for books and save them to your collection
      </Header.Subheader>
    </Header>
  );
};

export default PageHeader;
