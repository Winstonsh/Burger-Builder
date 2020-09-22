import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner  from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions'; 

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // axios.get('https://react-burger-builder-76d31.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data})
        //     })
        //     .catch(error => this.setState({error: true}));
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for(let i in this.state.ingredients) {
            //queryParams below is key value pair of ingredients (key=value)
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push("price=" + this.state.totalPrice);

        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
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

        const disableLessButton = { ...this.props.ings };

        for(let key in disableLessButton) {
            disableLessButton[key] = disableLessButton[key] <= 0;
        }

        let orderSummary = null
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />
        if(this.props.ings) {
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabledLessButton={disableLessButton}
                        price={this.state.totalPrice}
                        purchaseable={this.state.purchaseable}
                        ordered={this.purchaseHandler}
                    />
                </React.Fragment>
            )

            orderSummary = (
                <OrderSummary 
                    ingredients={this.props.ings} 
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.state.totalPrice}                    
                />
            )
        }

        if(this.state.loading) {
            orderSummary = <Spinner/>
        }

        return (
        <React.Fragment>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </React.Fragment>);
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingsName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingsName }),
        onIngredientRemoved: (ingsName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingsName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));