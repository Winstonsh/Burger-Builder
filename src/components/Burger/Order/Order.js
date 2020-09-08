import React from 'react';

import classes from './Order.module.css';

const order = () => {
    return(
        <div className={classes.Order}>
            <p>Ingredients: salad (1)</p>
            <p>price: <strong>USD 5.45</strong></p>
        </div>
    )
}

export default order;