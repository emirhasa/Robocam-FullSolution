import React from 'react';

import './App.scss';

import { Switch, Route } from 'react-router-dom';

import Header from './components/header/header.component';
import RobocamMainPage from './pages/robocam-main/robocam-main.component';
import StreamPage from './pages/stream/stream.component';

const App = () => (
    <div>
        <Header />
        <Switch>
            <Route exact path='/' component={RobocamMainPage} />
            <Route exact path='/command' component={RobocamMainPage} />
            <Route exact path='/stream' component={StreamPage} />
        </Switch>
    </div>
)

export default App;