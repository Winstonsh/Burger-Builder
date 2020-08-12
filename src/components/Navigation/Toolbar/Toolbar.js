import React from 'react';

import classes from '../Toolbar/Toolbar.module.css';
import BurgerLogo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => {
    return(
        <header className={classes.Toolbar}>
            <div>MENU</div>
            <div className={classes.Logo}>
                <BurgerLogo/>
            </div>
            <nav>
                <NavigationItems/>
            </nav>
        </header>
    );
}

export default toolbar