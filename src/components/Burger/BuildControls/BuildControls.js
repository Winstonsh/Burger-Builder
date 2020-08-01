import React from 'react';

import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label: 'Meat', type: 'meat'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Salad', type: 'salad'},
]

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current price: <strong>{props.price}</strong></p>
            {controls.map(control => {
                return (<BuildControl 
                            key={control.label} 
                            igQuantity={control.label}
                            add={() => props.ingredientAdded(control.type)}
                            remove={() => props.ingredientRemoved(control.type)}
                            disableButton={props.disabledLessButton[control.type]}
                        />
                        )
            })}
            <button 
                className={classes.OrderButton} 
                disabled={!props.purchaseable}
            >ORDER NOW</button>
        </div>
    );
};

export default buildControls;