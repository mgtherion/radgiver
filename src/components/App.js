import React from 'react';
import { Route, Switch } from 'react-router-dom';

const renderIndex = () => (
    <div>
        Hello, World!
    </div>
);

const renderUnknown = () => (
    <div>
        Hello, Unknown!
    </div>
);

export const App = () => (
    <Switch>
        <Route exact path="/" render={renderIndex} />
        <Route render={renderUnknown} />
    </Switch>
);

export default App;
