import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const Header = () => {

    return (
        <div className='header'>
            <AppBar className='header__container' position="static">
                <NavLink to='/command'>
                    <Button className='header__button'>
                        Command
                </Button>
                </NavLink>
                <NavLink to='/stream'>
                    <Button className='header__button'>
                        Stream
                </Button>
                </NavLink>
                <a href="https://fit.ba" rel="noopener noreferrer" target="_blank">
                    <Button className='header__button'>
                        Features
                </Button>
                </a>
                <a href="https://fit.ba" rel="noopener noreferrer" target="_blank">
                    <Button className='header__button'>
                        About
                </Button>
                </a>
                <a href="https://fit.ba" rel="noopener noreferrer" target="_blank">
                    <Button className='header__button'>
                        FIT Mostar
                </Button>
                </a>
            </AppBar>
        </div>
    );
}


export default Header;