import React, { Component } from 'react';

import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner  from '../../components/UI/Spinner/Spinner';

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
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false
    }

    purchaseContinueHandler = () => {
        this.setState({loading:true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            deliveryMethod: 'fastest',
            customer: {
                name: 'Winston Halim',
                email: 'test@test.com',
                address: {
                    street: 'testStreet1',
                    zipcode: 4152,
                    country: 'Australia'
                }
            }
        }

        axios.post("/orders.json", order)
            .then(response => {
                this.setState({loading: false, purchasing: false})
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false})
            })
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    updatePurchaseState = () => {
        const ingredients = {...this.state.ingredients};
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum,el) => {
            return sum + el;
        },0)
        this.setState({purchaseable: sum > 0})
    }

    addIngredientHandler = (type) => {
        const oldIngredient = this.state.ingredients[type]
        const updatedCount = oldIngredient + 1
        const updatedIngredient = { ...this.state.ingredients }; //copy state object in an immutable way
        updatedIngredient[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const updatedPrice = oldPrice + priceAddition
        
        this.setState({ingredients: updatedIngredient, totalPrice: updatedPrice},this.updatePurchaseState);
    }

    removeIngredientHandler = (type) => {
        if(this.state.ingredients[type] !== 0) {
        const oldIngredient = this.state.ingredients[type]
        const updatedCount = oldIngredient - 1
        const updatedIngredient = { ...this.state.ingredients };
        updatedIngredient[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const updatedPrice = oldPrice - priceDeduction
        
        this.setState({ingredients: updatedIngredient, totalPrice: updatedPrice},this.updatePurchaseState);
        }
    }

    render() {

        const disableLessButton = { ...this.state.ingredients };

        for(let key in disableLessButton) {
            disableLessButton[key] = disableLessButton[key] <= 0;
        }

        let orderSummary = 
        <OrderSummary 
            ingredients={this.state.ingredients} 
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice}                    
        />

        if(this.state.loading) {
            orderSummary = <Spinner/>
        }

        return (
        <React.Fragment>
            <Burger ingredients={this.state.ingredients}/>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            <BuildControls 
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabledLessButton={disableLessButton}
                price={this.state.totalPrice}
                purchaseable={this.state.purchaseable}
                ordered={this.purchaseHandler}
            />
        </React.Fragment>);
    }
}

export default BurgerBuilder;