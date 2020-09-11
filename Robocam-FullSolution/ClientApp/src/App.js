import React, { useState, useEffect } from 'react';

import './App.scss';

import { Switch, Route } from 'react-router-dom';

import LoginPage from './pages/login/login.component';
import Header from './components/header/header.component';
import RobocamMainPage from './pages/robocam-main/robocam-main.component';
import StreamPage from './pages/stream/stream.component';
import auth from './helper/auth';

const App = () => {

    const [userAuthenticated, setUserAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const checkLoggedUser = async () => {
        const checkLoggedUserCallback = (userData) => {
            if (userData) {
                setCurrentUser(userData);
                setUserAuthenticated(true);
            }
        }

        await auth.getLoggedUser(checkLoggedUserCallback);
    }

    useEffect(() => {
        checkLoggedUser();
    }, []);

    return (
        <div>
            {!userAuthenticated ?
                <LoginPage setUserAuthenticated={setUserAuthenticated} />
                :
                <>
                    <Header setUserAuthenticated={setUserAuthenticated} />
                    <Switch>
                        <Route exact path='/' component={RobocamMainPage} />
                        <Route exact path='/command' component={RobocamMainPage} />
                        <Route exact path='/stream' component={StreamPage} />
                    </Switch>
                </>
            }
        </div>
    )
}

export default App;