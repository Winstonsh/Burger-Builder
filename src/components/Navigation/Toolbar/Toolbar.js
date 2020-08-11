import React from 'react';

import classes from '../Toolbar/Toolbar.module.css';
import BurgerLogo from '../../Logo/Logo';

const toolbar = (props) => {
    return(
        <header className={classes.Toolbar}>
            <div>MENU</div>
            <BurgerLogo />
            <nav>
                ...
            </nav>
        </header>
    );
}

export default toolbar