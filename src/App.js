import "./scss/styles.scss";
import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import configureStore from "./store/store";
const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

function App() {
  return (
    <ReduxProvider store={reduxStore}>
      <Router>
        <div className="app">
          <Switch>
            <Route path="/" component={Home} exact />
            <Route component={ErrorComponent} />
          </Switch>
        </div>
      </Router>
    </ReduxProvider>
  );
}

const Home = () => <p>home</p>;
const ErrorComponent = () => <p>Error</p>;

export default App;
