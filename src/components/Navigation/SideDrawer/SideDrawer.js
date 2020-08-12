import React from 'react';

import classes from './SideDrawer.module.css'

import BurgerLogo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const sideDrawer = (props) => {
    return(
        <div className={classes.SideDrawer}>
            <div className={classes.Logo}>
                <BurgerLogo/>
            </div>
            <nav>
                <NavigationItems/>
            </nav>
        </div>
    );
};

export default sideDrawer;