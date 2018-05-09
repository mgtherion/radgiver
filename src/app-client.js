import React from 'react';
import { render } from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import SuggestPage from './components/Suggest/Page';
import ResultPage from './components/Result/Page';

const AppClient = () => (
    <Router>
        <Switch>
            <Route exact path="/fb" component={SuggestPage} />
            <Route exact path="/fb/results" component={ResultPage} />
        </Switch>
    </Router>
);


window.onload = () => {
  render(<AppClient />, document.getElementById('main'));
};
