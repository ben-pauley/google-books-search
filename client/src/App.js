import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Saved from "./pages/Saved";
import Search from "./pages/Search";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import PageHeader from "./components/PageHeader";
import UpdateMessage from "./components/UpdateMessage";
import { StoreProvider } from "./utils/GlobalState";
import API from "./utils/API";

function App() {
  // State to trigger message when update received from sockets.io API
  const [savedUpdate, setSavedUpdate] = useState({
    favorite: "",
    isVisible: false,
  });

  API.subscribeToUpdates(null, (response) => {
    setSavedUpdate({
      favorite: response,
      isVisible: true,
    });
    setTimeout(
      () =>
        setSavedUpdate({
          favorite: "",
          isVisible: false,
        }),
      4000
    );
  });

  return (
    <BrowserRouter>
      <div>
        <UpdateMessage savedUpdate={savedUpdate} />
        <StoreProvider>
          <PageHeader />
          <Nav />
          <Switch>
            <Route exact path="/" component={Search} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/saved" component={Saved} />
            <Route component={NoMatch} />
          </Switch>
        </StoreProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
