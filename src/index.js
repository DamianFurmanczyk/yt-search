import registerServiceWorker from "./registerServiceWorker";
import "semantic-ui-css/semantic.min.css";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Container } from "semantic-ui-react";

import SearchBar from "./components/SearchBar";
import VideoEmbed from "./components/VideoEmbed";
import Videos from "./components/Videos";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

import { observeAuthChanges } from "./actions/auth";
import { observeUsersChanges } from "./actions/users";
import { observePlaylistsChanges } from "./actions/playlists";

const store = createStore(rootReducer, applyMiddleware(thunk));

store.dispatch(observeAuthChanges());
store.dispatch(observeUsersChanges());
store.dispatch(observePlaylistsChanges());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <main id="ultramain">
        <Route path="/" component={SearchBar} />
        <Container>
          <Switch>
            <Route path="/" exact component={Videos} />
            <Route path="/search/:query" exact component={Videos} />
            <Route path="/show/:id" component={VideoEmbed} />
            <Redirect to="/" />
          </Switch>
        </Container>
      </main>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
