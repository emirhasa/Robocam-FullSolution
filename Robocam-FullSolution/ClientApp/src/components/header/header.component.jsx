import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HelpIcon from '@material-ui/icons/Help';
import InfoIcon from '@material-ui/icons/Info';
import auth from '../../helper/auth';

const Header = (props) => {

    const logout = async () => {
        await auth.logout();
        props.setUserAuthenticated(false);
    }

    return (
        <div className='header'>
            <AppBar className='header__container' position="static">
                <NavLink to='/command' isActive={(match, location) => { return location.pathname == "/" || location.pathname == "/command" }} activeClassName={"active"}>
                    <Button className='header__button'>
                        Command
                    </Button>
                </NavLink>
                <NavLink to='/stream' activeClassName={"active"}>
                    <Button className='header__button'>
                        Stream
                    </Button>
                </NavLink>
                <a href="https://fit.ba" rel="noopener noreferrer" target="_blank">
                    <Button className='header__button'>
                        { /* features */}
                        <InfoIcon />
                    </Button>
                </a>
                <a href="https://fit.ba" rel="noopener noreferrer" target="_blank">
                    <Button className='header__button'>
                        { /* about */}
                        <HelpIcon />
                    </Button>
                </a>
                <a href="https://fit.ba" rel="noopener noreferrer" target="_blank">
                    <Button className='header__button'>
                        FIT Mostar
                    </Button>
                </a>
                <Button className='header__button' onClick={logout}>
                    <ExitToAppIcon />
                </Button>
            </AppBar>
        </div>
    );
}


export default Header;