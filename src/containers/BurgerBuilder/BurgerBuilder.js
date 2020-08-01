import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            meat: 0,
            salad: 0,
            bacon: 0,
            cheese: 0
        },
        totalPrice: 4
    }

    addIngredientHandler = (type) => {
        const oldIngredient = this.state.ingredients[type]
        const updatedCount = oldIngredient + 1
        const updatedIngredient = { ...this.state.ingredients };
        updatedIngredient[type] = updatedCount;
        
        this.setState({ingredients: updatedIngredient});
    }

    removeIngredientHandler = (type) => {

    }

    render() {
        return (
        <React.Fragment>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls 
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
            />
        </React.Fragment>);
    }
}

export default BurgerBuilder;