import "./scss/styles.scss";
import React, { Suspense } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import configureStore from "./store/store";

//components
import MainLayout from "./components/layout/MainLayout";
import Loader from "./components/layout/Loader";
const AuthorPage = React.lazy(() => import("./components/pages/AuthorPage"));
const SingleArticlePage = React.lazy(() =>
  import("./components/pages/SingleArticlePage")
);

//redux store
const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

function App() {
  return (
    <div className="app">
      <ReduxProvider store={reduxStore}>
        <Router>
          <MainLayout>
            <Suspense fallback={<Loader />}>
              <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/author/:uid" component={AuthorPage} exact />
                <Route
                  path="/articles/:uid"
                  component={SingleArticlePage}
                  exact
                />
                <Route component={ErrorComponent} />
              </Switch>
            </Suspense>
          </MainLayout>
        </Router>
      </ReduxProvider>
    </div>
  );
}

const Home = () => <p>home</p>;
const ErrorComponent = () => <p>Error</p>;

export default App;
