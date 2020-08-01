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
            {controls.map(control => {
                return (<BuildControl 
                            key={control.label} 
                            label={control.label}
                            add={() => props.ingredientAdded(control.type)}
                        />
                        )
            })}
        </div>
    );
};

export default buildControls;